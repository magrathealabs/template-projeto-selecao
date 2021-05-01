from db import DB


class PdfWatermarkModel(DB.Model):

    __tablename__ = "pdf_watermark"

    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(100), nullable=False)
    watermarked_file = DB.Column(DB.LargeBinary, nullable=False)


    def save_to_db(self):
        DB.session.add(self)
        DB.session.commit()

    def delete_from_db(self):
        DB.session.delete(self)
        DB.session.commit()

    @classmethod
    def find_by_name(cls, name: str):
        return PdfWatermarkModel.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id: str):
        return PdfWatermarkModel.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls):
        return PdfWatermarkModel.query.all()
