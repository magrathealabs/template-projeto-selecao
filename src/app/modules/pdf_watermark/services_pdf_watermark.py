import logging

import PyPDF2

logger = logging.getLogger(__name__)

def pdf_watermarker(pdf_file, watermark, filename):
    """
    Function to watermark all pages of a pdf file.
    """
    try:
        input_file = PyPDF2.PdfFileReader(open(pdf_file, "rb"))
        watermark = PyPDF2.PdfFileReader(open(watermark, "rb"))
        output = PyPDF2.PdfFileWriter()

    except FileNotFoundError as err:
        logger.error("Error while trying to read pdf file.", exc_info=1)
        raise err

    try:

        for i in range(input_file.getNumPages()):
            page = input_file.getPage(i)
            page.mergePage(watermark.getPage(0))
            output.addPage(page)

            with open("./uploads/watermarked_files/" + filename, "wb") as file:
                output.write(file)

    except Exception as err:
        logger.error("Error while trying to watermark pdf file.", exc_info=1)
        raise err

    return file
