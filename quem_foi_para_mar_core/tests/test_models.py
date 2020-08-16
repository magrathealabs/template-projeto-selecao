from django.test import TestCase
from quem_foi_para_mar_core.models import Pescador, Embarcacao, Viagem


class PescadorModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Pescador.objects.create(nome='Geronimo', endereco='Rua do Galeao',
                                telefone='48-90102-0304',
                                email='geronimo@geronimo.com',
                                contato='Joana(irma), 48-2534-8564')

    def test_nome_pescador_label(self):
        pescador = Pescador.objects.get(id=1)
        field_label = pescador._meta.get_field('nome').verbose_name
        self.assertEquals(field_label, 'Nome')

    def test_endereco_pescador_label(self):
        pescador = Pescador.objects.get(id=1)
        field_label = pescador._meta.get_field('endereco').verbose_name
        self.assertEquals(field_label, 'Endereço')

    def test_telefone_label(self):
        pescador = Pescador.objects.get(id=1)
        field_label = pescador._meta.get_field('telefone').verbose_name
        self.assertEquals(field_label, "Telefone")

    def test_email_label(self):
        pescador = Pescador.objects.get(id=1)
        field_label = pescador._meta.get_field('email').verbose_name
        self.assertEquals(field_label, "Email")

    def test_contato_label(self):
        pescador = Pescador.objects.get(id=1)
        field_label = pescador._meta.get_field('contato').verbose_name
        self.assertEquals(field_label, "Contato em terra(nome e telefone)")

    def test_nome_max_length(self):
        pescador = Pescador.objects.get(id=1)
        max_length = pescador._meta.get_field('nome').max_length
        self.assertEquals(max_length, 254)

    def test_endereco_max_length(self):
        pescador = Pescador.objects.get(id=1)
        max_length = pescador._meta.get_field('endereco').max_length
        self.assertEquals(max_length, 254)

    def test_telefone_max_length(self):
        pescador = Pescador.objects.get(id=1)
        max_length = pescador._meta.get_field('telefone').max_length
        self.assertEquals(max_length, 50)

    def test_contato_max_length(self):
        pescador = Pescador.objects.get(id=1)
        max_length = pescador._meta.get_field('contato').max_length
        self.assertEquals(max_length, 150)

    def test_object_is_nome(self):
        pescador = Pescador.objects.get(id=1)
        expected_object_name = f'{pescador.nome}'
        self.assertEquals(expected_object_name, str(pescador))


class EmbarcacaoModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Embarcacao.objects.create(nome='Galeao', numeracao='z12-2564-42259',
                                  modelo='ANN2459',
                                  caracteristicas='Barco com casaria azul e branco')

    def test_nome_embarcacao_label(self):
        embarcacao = Embarcacao.objects.get(id=1)
        field_label = embarcacao._meta.get_field('nome').verbose_name
        self.assertEquals(field_label, 'Nome')

    def test_numeracao_embarcacao_label(self):
        embarcacao = Embarcacao.objects.get(id=1)
        field_label = embarcacao._meta.get_field('numeracao').verbose_name
        self.assertEquals(field_label, 'Numeração')

    def test_modelo_embarcacao_label(self):
        embarcacao = Embarcacao.objects.get(id=1)
        field_label = embarcacao._meta.get_field('modelo').verbose_name
        self.assertEquals(field_label, "Modelo")

    def test_caracteristicas_embarcacao_label(self):
        embarcacao = Embarcacao.objects.get(id=1)
        field_label = embarcacao._meta.get_field('caracteristicas').verbose_name
        self.assertEquals(field_label, "características")

    def test_nome_embarcacao_max_length(self):
        embarcacao = Embarcacao.objects.get(id=1)
        max_length = embarcacao._meta.get_field('nome').max_length
        self.assertEquals(max_length, 254)

    def test_numeracao_embarcacao_max_length(self):
        embarcacao = Embarcacao.objects.get(id=1)
        max_length = embarcacao._meta.get_field('numeracao').max_length
        self.assertEquals(max_length, 50)

    def test_modelo_embarcacao_max_length(self):
        embarcacao = Embarcacao.objects.get(id=1)
        max_length = embarcacao._meta.get_field('modelo').max_length
        self.assertEquals(max_length, 100)

    def test_caracteristicas_embarcacao_max_length(self):
        embarcacao = Embarcacao.objects.get(id=1)
        max_length = embarcacao._meta.get_field('caracteristicas').max_length
        self.assertEquals(max_length, 254)

    def test_object_is_nome(self):
        embarcacao = Embarcacao.objects.get(id=1)
        expected_object_name = f'{embarcacao.nome}'
        self.assertEquals(expected_object_name, str(embarcacao))


class ViagemModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        embarcacao = Embarcacao.objects.create(nome='Galeao', numeracao='z12-2564-42259',
                                               modelo='ANN2459', caracteristicas='Barco com casaria azul e branco')
        embarcacao.save()
        pescador = Pescador.objects.create(nome='Geronimo', endereco='Rua do Galeao',
                                telefone='48-90102-0304', email='geronimo@geronimo.com',
                                contato='Joana(irma), 48-2534-8564')
        pescador.save()

        viagem = Viagem.objects.create(destino='Murmansk', data_partida='2020-08-13',
                              data_chegada_prevista='2020-09-23',
                              tripulacao='Geronimo, Clovis, Nicolas, Ryuk',
                              embarcacao_id=embarcacao, pescador_id=pescador)

    def test_destino_viagem_label(self):
        viagem = Viagem.objects.get(id=1)
        field_label = viagem._meta.get_field('destino').verbose_name
        self.assertEquals(field_label, 'Destino')

    def test_data_partida_viagem_label(self):
        viagem = Viagem.objects.get(id=1)
        field_label = viagem._meta.get_field('data_partida').verbose_name
        self.assertEquals(field_label, 'Data de partida')

    def test_data_chegada_viagem_label(self):
        viagem = Viagem.objects.get(id=1)
        field_label = viagem._meta.get_field('data_chegada_prevista').verbose_name
        self.assertEquals(field_label, "Data de chegada prevista")

    def test_tripulacao_viagem_label(self):
        viagem = Viagem.objects.get(id=1)
        field_label = viagem._meta.get_field('tripulacao').verbose_name
        self.assertEquals(field_label, "Nome dos tripulantes")

    def test_destino_viagem_max_length(self):
        viagem = Viagem.objects.get(id=1)
        max_length = viagem._meta.get_field('destino').max_length
        self.assertEquals(max_length, 254)

    def test_tripulacao_viagem_max_length(self):
        viagem = Viagem.objects.get(id=1)
        max_length = viagem._meta.get_field('tripulacao').max_length
        self.assertEquals(max_length, 254)

    def test_object_is_nome(self):
        viagem = Viagem.objects.get(id=1)
        expected_object_name = f'{viagem.destino}'
        self.assertEquals(expected_object_name, str(viagem))
