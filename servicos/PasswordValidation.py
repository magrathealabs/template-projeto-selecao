class PasswordValidation:
    def validate_password(senha):
        """Validação da senha

        Args:
            senha (str): Input da senha do usuário

        Returns:
            flag: Valor booleano especificando se a senha é válida ou não
        """
        flag = True

        if not PasswordValidation.have_number(senha):
            flag = False
        
        if not PasswordValidation.have_lower(senha):
            flag = False
            
        if (len(senha) < 8):
            flag = False

        return flag

    def have_lower(cadeia):
        """Verifica se a string possui um caracter minúsculo

        Args:
            cadeia (str): String que será verificado

        Returns:
            bool: Valor booleano dizendo se tem ou não um caracter minúsculo
        """

        for i in cadeia:
            if i.islower():
                return True
        
        return False


    def have_number(cadeia):
        """Verifica se tem um numero na cadeia de caracter

        Args:
            cadeia (str): Cadeia de caracter que será verificado se tem número

        Returns:
            bool: Valor booleano dizendo se tem ou não um número
        """

        for i in cadeia:
            if i.isdigit():
                return True
        return False
