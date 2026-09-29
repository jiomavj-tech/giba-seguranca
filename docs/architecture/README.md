# Arquitetura

Princípio central:

> O aplicativo conhece funções. Os conectores conhecem fabricantes.

O frontend nunca chama APIs de fabricantes diretamente.

Fluxo base:

APP → GIBA API → CORE → CONNECTOR → DEVICE

## 0.0.1-LAB

A primeira versão valida o Core com FakeSecurityConnector antes do hardware físico.
