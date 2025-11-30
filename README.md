# SmartMarket 🛒

O SmartMarket é um aplicativo móvel de lista de supermercado desenvolvido com React Native (Expo) e Firebase Firestore. O objetivo é permitir que o utilizador registe produtos, quantidades e preços, calculando automaticamente o valor total da compra em tempo real.

## 📱 Demonstração

Pode ver o funcionamento do aplicativo no vídeo de demonstração abaixou ou incluído neste repositório: `demo_app.mp4`.

<div align="center">
  <video width="320" height="640" controls>
    <source src="demo_app.mp4" type="video/mp4">
    Seu navegador não suporta a tag de vídeo.
  </video>
</div>

## ✨ Funcionalidades

- **CRUD Completo**: Adicionar, Ler, Editar e Excluir produtos da lista.
- **Cálculo Automático**:
  - Subtotal por item (Quantidade × Preço Unitário).
  - Total geral da lista atualizado em tempo real.
- **Checklist**: Marcar itens como "comprados" visualmente (riscado e verde).
- **Interface Moderna**: Design limpo com feedback visual (Toasts) e navegação por abas.

## 🛠️ Tecnologias Utilizadas

- React Native (via Expo)
- Firebase Firestore (Base de dados em tempo real)
- React Navigation (Navegação por abas)
- Expo Vector Icons
- React Native Toast Message