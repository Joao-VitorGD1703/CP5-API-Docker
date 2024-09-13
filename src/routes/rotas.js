import Produto from '../models/Produto.js';
import express from 'express';

const router = express.Router();

router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

router.post('/produtos', async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    const novoProduto = new Produto({ nome, preco, estoque });
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
});

router.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, estoque } = req.body;
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco, estoque },
      { new: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(produtoAtualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
});

export default router;
