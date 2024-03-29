import docker
from io import BytesIO
import json
from threading import Timer

client = docker.from_env()

def run(str):
    f = open('test_service/to_test', 'w')
    f.write(str)
    f.close()
    
    client.images.build(tag="test", path="test_service/")
    print("Docker initialized")

    res = client.containers.run("test", detach=True)

    def stopContainer():
        res.kill()
    t = Timer(1, stopContainer)
    t.start()

    status_code = res.wait()["StatusCode"]
    t.cancel()

    if status_code == 0:
        return ({
            "status": "OK",
            "output": res.logs().decode("utf-8")
        })
    elif status_code == 137:
        return ({
            "status": "ERROR",
            "output": "",
            "error": {"text": "Stopped by timeout"}
        })
    else:
        lines = res.logs().decode("utf-8").split(sep="\n")
        del lines[-1]
        error = lines[-1]
        del lines[-1]
        output = "\n".join(lines)

        return ({
            "status": "ERROR",
            "output": output,
            "error": json.loads(error)
        })