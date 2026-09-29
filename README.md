# Giba Segurança

Plataforma multimarca de integração de segurança eletrônica.

## 0.0.1-LAB

Primeiro objetivo: validar o núcleo com um Fake DVR e, em seguida, integrar os DVRs Hikvision do LAB-GIBA-001.

> O aplicativo conhece funções. Os conectores conhecem fabricantes.

### Escopo M1

- Gateway local
- SQLite
- Device Registry
- Capability Registry
- State Engine
- Connector Manager
- FakeSecurityConnector
- HikvisionConnector
- Live View
- Main/Substream
- Snapshot
- Health
- Logs e traceId
- WebSocket
- Giba Lab

### Homologação

DOCUMENTED → DETECTED → LAB_VERIFIED → FIELD_VERIFIED

Uma função só recebe LAB_VERIFIED depois de teste físico obrigatório.
