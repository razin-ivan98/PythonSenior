
import sys
import json

try:
    f = open("to_test", "r")
    str = f.read()
    exec(str)
except SyntaxError as e:
    print (json.dumps({
        "line": e.lineno,
        "text": e.msg
    }))
    sys.exit(1)

except Exception as e:
    ptr = sys.exc_info()[2]
    while ptr.tb_next:
        ptr = ptr.tb_next
    print (json.dumps({
        "line": ptr.tb_lineno,
        "text": e.__str__()
    }))
    sys.exit(1)
