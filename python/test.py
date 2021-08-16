
import traceback
import sys

try:
    import main
    main.func()

except SyntaxError as e:
    # traceback.print_exc()  # Remove to silence any errros
    # print(type(traceback.format_exc(limit=None, chain=False)))
    # print(sys.exc_info()[1].lineno)
    # print(sys.exc_info()[1].offset)
    # print(sys.exc_info()[1].msg)
    # print(sys.exc_info())
    # print(type(e))
    print(e.lineno)

    print(e)
    exit()
except Exception as e:
    # print("NameError")
    # print (type(e))
    # print (e.__dir__())
    print (e)
    # traceback.print_exc()  # Remove to silence any errros

    ptr = sys.exc_info()[2]
    while ptr.tb_next:
        ptr = ptr.tb_next
    

    print(ptr.tb_lineno)
    # logging.warning(e)




# print("OK")

