from django.shortcuts import render

class ValidationError(Exception):
    def __init__(self, request, code, infos):
        self.request = request
        self.code = code
        self.infos = infos

        super(Exception, self).__init__()

def page_error(request, code, infos):
    """Faz o tratamento de página de erro com base no código

    Args:
        request (request): Requisição feita para a página de erro
        code (int): Código de erro
        infos (dict): Dicionário contendo as informações do usuário

    Returns:
        render: Encaminha para a página de erro
    """
    msg = {
        400 : "Bad Request",
        401 : "Não possui autorização para acessar a página",
        403 : "Proibido acessar esta URL",
        404 : "Página não encontrada",
        405 : "Método não permitido",
        500 : "Erro no servidor",
    }

    error = {
        "code" : code,
        "msg" : msg[code]
    }

    return render(request, "repos/error.html", {"infos":infos, "error":error})

def exceptionHandler(function):
    """Decorador para tratamento de exceção

    Args:
        function (wrapper): Decorador de método
    """
    def wrapper(*args):
        try:
            return function(*args)

        except ValidationError as ex:
            return page_error(ex.request, ex.code, ex.infos)
            
        except Exception as ex:
            return page_error(args[0].request, 500, args[0].infos)

    return wrapper
