import ddddocr

def codeIdentify(code):
    ocr = ddddocr.DdddOcr()
    res = ocr.classification(code)
    print(res)
    return res