from django.shortcuts import render
from django.core.paginator import Paginator

class Pagination():
    def paginacao(repositorios, page_number):
        """Faz a paginação da lista de repositórios buscada

        Args:
            repositorios (list): Lista de repositórios procurados

        Returns:
            page_obj: Objeto que contem os repositórios separados por página
        """

        page_obj = []

        if repositorios:
            query_paginator = Paginator(repositorios, 10)
            page_obj = query_paginator.get_page(page_number)
        
        return page_obj
