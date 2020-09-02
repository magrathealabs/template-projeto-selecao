import json

class String():
    def string_to_json(cadeia):
        """Carrega uma string json para um formato json

        Args:
            cadeia (str): Cadeia de caracter a ser convertida

        Returns:
            json: Retorna um json
        """
        cadeia = cadeia.replace("'", "\"").replace("True", "true").replace("False", "false").replace("None", "null")
        return json.loads(cadeia)
