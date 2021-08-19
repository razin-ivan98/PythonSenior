
import sys

def test(codeStr):
    try:
        exec(codeStr)
        return {"status": "OK"}
    except SyntaxError as e:
        # print(e.lineno)

        # print(e)
        return {
            "status": "ERROR",
            "error": {
                "line": e.lineno,
                "text": e.msg
            }
        }

    except Exception as e:
        # print (e)

        ptr = sys.exc_info()[2]
        while ptr.tb_next:
            ptr = ptr.tb_next
        
        return {
            "status": "ERROR",
            "error": {
                "line": ptr.tb_lineno,
                "text": e.__str__()
            }
        }
