from ma import MA
from app.modules.pdf_watermark.models_pdf_watermark import PdfWatermarkModel


class PdfWatermarkSchema(MA.SQLAlchemyAutoSchema):
    class Meta:
        model = PdfWatermarkModel
        load_only = ("watermarked_file",)
        dump_only = ("id",)
        load_instance = True
