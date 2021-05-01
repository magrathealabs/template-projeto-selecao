import os
import time

from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from werkzeug.utils import secure_filename

from app.libs.strings import gettext
from app.modules.pdf_watermark.models_pdf_watermark import PdfWatermarkModel
from app.modules.pdf_watermark.schema_pdf_watermark import PdfWatermarkSchema
from app.modules.pdf_watermark.services_pdf_watermark import pdf_watermarker


file_schema = PdfWatermarkSchema()
file_list_schema = PdfWatermarkSchema(many=True)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads/uploaded_files")

watermark = "./assets/watermark.pdf"


class PdfWatermarks(Resource):
    @classmethod
    def get(cls):
        """
        Retrieve all pdf watermarked files stored in database.
        """
        try:
            files = file_list_schema.dump(PdfWatermarkModel.find_all())

        except Exception as err:
            raise err

        return {"files": files}, 200

    @classmethod
    def post(cls):
        """
        Upload, watermark store a pdf file in database.
        """
        try:
            file = request.files["inputWatermark"]
            mimetype = file.content_type

            if not mimetype == "application/pdf":
                return {
                    "message": "File with the wrong type. Should be application/pdf"
                }

        except Exception as err:
            raise err

        try:
            timestamp = int(time.time())
            output = "{}_{}".format(timestamp, file.filename)
            path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
            file.save(path)

            pdf_watermarker(path, watermark, output)

        except Exception as err:
            raise err

        try:
            new_file = PdfWatermarkModel(
                name=file.filename, watermarked_file=file.read()
            )

            if PdfWatermarkModel.find_by_name(new_file.name):
                return {"message": gettext("file_name_exists")}, 400

            new_file.save_to_db()

        except Exception as err:
            raise err

        return {"message": gettext("file_uploaded")}, 201


class PdfWatermark(Resource):
    @classmethod
    def get(cls, file_id):
        """
        Retrieve a watermarked pdf file stored in database by its ID.
        """
        try:
            file = PdfWatermarkModel.find_by_id(file_id)
            if file:
                return file_schema.dump(file), 200
            return {"message": gettext("file_not_found")}, 404

        except Exception as err:
            raise err

    @classmethod
    def put(cls, file_id):
        """
        Update and save a watermarked pdf file name by its ID.
        """
        try:
            file_json = request.get_json()
            file = PdfWatermarkModel.find_by_id(file_id)

            if file:
                file.name = file_json["name"]
            else:
                return {"message": gettext("file_not_found")}, 404

            file.save_to_db()

        except Exception as err:
            raise err

        return file_schema.dump(file), 200

    @classmethod
    def delete(cls, file_id):
        """
        Delete a a watermarked pdf file by its ID.
        """
        try:
            file = PdfWatermarkModel.find_by_id(file_id)
            if file:
                file.delete_from_db()
                return {"message": gettext("file_deleted")}, 200
            return {"message": gettext("file_not_found")}, 404

        except Exception as err:
            raise err
