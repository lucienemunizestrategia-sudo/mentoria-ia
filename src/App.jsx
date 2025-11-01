import React, { useState } from 'react';
import { Lightbulb, FileText, TrendingUp, Menu, X, Sparkles, CheckCircle, DollarSign } from 'lucide-react';

const GROQ_API_KEY = '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';


const MentorIA = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const [ideaForm, setIdeaForm] = useState({ idea: '', target: '', problem: '' });
  const [businessForm, setBusinessForm] = useState({ business: '', market: '', investment: '' });
  const [marketingForm, setMarketingForm] = useState({ product: '', audience: '', budget: '' });
  const [diagnosticForm, setDiagnosticForm] = useState({ 
    temNegocio: '', 
    faturamentoMensal: '', 
    tempoMercado: '', 
    principalDesafio: '', 
    temClientes: '', 
    fazMarketing: '', 
    controlaFinancas: '', 
    temEquipe: '', 
    objetivoPrincipal: '', 
    investirAgora: '' 
  });
  const [pricingForm, setPricingForm] = useState({ 
    produto: '', 
    custosFixos: '', 
    custosVariaveis: '', 
    tempoProducao: '', 
    margemDesejada: '', 
    concorrentePreco: '',
    segmento: '',
    experiencia: ''
  });

  const analyzeIdea = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'Você é um mentor de negócios de elite. Sempre retorne JSON válido.' },
            { role: 'user', content: `Analise esta ideia como um mentor de negócios internacional de elite. Use linguagem acessível, mas com profundidade estratégica. Seja honesto, direto e pragmático.

IDEIA: ${ideaForm.idea}
PÚBLICO: ${ideaForm.target}
PROBLEMA: ${ideaForm.problem}

Retorne JSON válido:
{
  "score": 85,
  "viabilidade": "alta",
  "frase_impacto": "Frase curta sobre o potencial",
  "pontos_fortes": ["Força 1", "Força 2", "Força 3"],
  "pontos_atencao": ["Atenção 1", "Atenção 2"],
  "proximos_passos": ["Ação 1", "Ação 2", "Ação 3"]
}` }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (error) {
      setResult({ error: true, message: 'Erro ao processar análise.' });
    }
    setLoading(false);
  };

  const generateDiagnostic = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'Você é consultor elite de negócios. Retorne JSON válido.' },
            { role: 'user', content: `Analise este negócio com visão estratégica:

Tem negócio: ${diagnosticForm.temNegocio}
Faturamento: ${diagnosticForm.faturamentoMensal}
Tempo mercado: ${diagnosticForm.tempoMercado}
Desafio: ${diagnosticForm.principalDesafio}
Clientes: ${diagnosticForm.temClientes}
Marketing: ${diagnosticForm.fazMarketing}
Finanças: ${diagnosticForm.controlaFinancas}
Equipe: ${diagnosticForm.temEquipe}
Objetivo: ${diagnosticForm.objetivoPrincipal}
Investir: ${diagnosticForm.investirAgora}

Retorne JSON válido:
{
  "score_geral": 75,
  "nivel": "Intermediário",
  "frase_impacto": "Frase sobre o momento do negócio",
  "forcas": ["Força 1", "Força 2"],
  "fraquezas": ["Fraqueza 1", "Fraqueza 2"],
  "prioridades": ["Prioridade 1", "Prioridade 2", "Prioridade 3"],
  "recomendacao_ferramenta": "Nome da ferramenta MentorIA recomendada",
  "proximos_passos": ["Passo 1", "Passo 2", "Passo 3"]
}` }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (error) {
      setResult({ error: true, message: 'Erro ao processar diagnóstico.' });
    }
    setLoading(false);
  };

  const generateBusinessPlan = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'Você é consultor estratégico elite. Retorne JSON válido.' },
            { role: 'user', content: `Crie um plano de negócios estruturado:

NEGÓCIO: ${businessForm.business}
MERCADO: ${businessForm.market}
INVESTIMENTO: ${businessForm.investment}

Retorne JSON válido:
{
  "frase_impacto": "Frase sobre o potencial do negócio",
  "resumo_executivo": "Resumo de 2-3 linhas sobre o negócio",
  "analise_mercado": {
    "tamanho_mercado": "Descrição do tamanho",
    "publico_alvo": "Descrição do público",
    "tendencias": "Tendências principais"
  },
  "estrategia_receita": {
    "fontes_receita": ["Fonte 1", "Fonte 2"],
    "precificacao": "Estratégia de preços",
    "projecao_mensal": "Projeção realista"
  }
}` }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (error) {
      setResult({ error: true, message: 'Erro ao gerar plano de negócios.' });
    }
    setLoading(false);
  };

  const generateMarketingStrategy = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'Você é estrategista de marketing elite. Retorne JSON válido.' },
            { role: 'user', content: `Crie estratégia de marketing para 30 dias:

PRODUTO: ${marketingForm.product}
PÚBLICO: ${marketingForm.audience}
ORÇAMENTO: ${marketingForm.budget}

Retorne JSON válido:
{
  "frase_impacto": "Frase sobre a estratégia",
  "canais_prioritarios": ["Canal 1", "Canal 2", "Canal 3"],
  "primeiras_acoes": ["Ação 1", "Ação 2", "Ação 3"],
  "calendario_30dias": ["Semana 1: ações", "Semana 2: ações", "Semana 3: ações", "Semana 4: ações"],
  "metricas_acompanhar": ["Métrica 1", "Métrica 2", "Métrica 3"]
}` }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (error) {
      setResult({ error: true, message: 'Erro ao gerar estratégia de marketing.' });
    }
    setLoading(false);
  };

  const calculatePricing = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'Você é um consultor financeiro especialista em precificação. SEMPRE retorne APENAS JSON válido, sem texto adicional antes ou depois.' },
            { role: 'user', content: `Analise e calcule o preço ideal:

PRODUTO: ${pricingForm.produto}
CUSTOS FIXOS MENSAIS: R$ ${pricingForm.custosFixos}
CUSTOS VARIÁVEIS: R$ ${pricingForm.custosVariaveis}
TEMPO PRODUÇÃO: ${pricingForm.tempoProducao}
MARGEM DESEJADA: ${pricingForm.margemDesejada}%
PREÇO CONCORRENTE: R$ ${pricingForm.concorrentePreco}
SEGMENTO: ${pricingForm.segmento}
EXPERIÊNCIA: ${pricingForm.experiencia}

Retorne APENAS este JSON (sem markdown, sem texto extra):
{
  "preco_minimo": "500.00",
  "preco_ideal": "850.00",
  "preco_premium": "1200.00",
  "frase_impacto": "Frase sobre precificação",
  "analise_completa": {
    "custo_total_unitario": "280.00",
    "margem_liquida_ideal": "67",
    "ponto_equilibrio_mensal": "15",
    "posicionamento_mercado": "Premium"
  },
  "estrategia_precificacao": {
    "recomendacao_principal": "Recomendação clara",
    "justificativa": "Justificativa da estratégia",
    "quando_usar_minimo": "Quando usar mínimo",
    "quando_usar_ideal": "Quando usar ideal",
    "quando_usar_premium": "Quando usar premium"
  },
  "comparativo_concorrencia": {
    "analise": "Análise vs concorrente",
    "vantagem_competitiva": "Vantagem competitiva"
  },
  "alertas_importantes": ["Alerta 1", "Alerta 2"],
  "proximos_passos": ["Passo 1", "Passo 2", "Passo 3"]
}` }
          ],
          temperature: 0.7,
          max_tokens: 2500,
          response_format: { type: "json_object" }
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Erro API:', data);
        throw new Error(data.error?.message || 'Erro na API');
      }
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Resposta inválida da API');
      }
      
      const content = data.choices[0].message.content;
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      
      const parsed = JSON.parse(cleanContent);
      setResult(parsed);
      
    } catch (error) {
      console.error('Erro completo:', error);
      setResult({ 
        error: true, 
        message: `Erro ao calcular: ${error.message || 'Tente novamente'}` 
      });
    }
    setLoading(false);
  };

  const renderHome = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Sparkles className="w-16 h-16 text-purple-500 mx-auto" />
        <h1 className="text-4xl font-bold text-white">MentorIA</h1>
        <p className="text-xl text-gray-300">Seu mentor de negócios com IA</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div onClick={() => setActiveTab('pricing')} className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/50 rounded-lg p-6 hover:border-green-400 cursor-pointer transform hover:scale-105 transition-all">
          <DollarSign className="w-12 h-12 text-green-400 mb-4" />
          <div className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded inline-block mb-2">NOVO</div>
          <h3 className="text-xl font-bold text-white mb-2">Calculadora de Precificação</h3>
          <p className="text-gray-300">Descubra o preço ideal para seu produto ou serviço</p>
        </div>
        <div onClick={() => setActiveTab('diagnostic')} className="bg-gray-900 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition-all">
          <CheckCircle className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Diagnóstico Rápido</h3>
          <p className="text-gray-400">10 perguntas para analisar seu negócio</p>
        </div>
        <div onClick={() => setActiveTab('validator')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer transition-all">
          <Lightbulb className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Validador de Ideias</h3>
          <p className="text-gray-400">Analise a viabilidade da sua ideia</p>
        </div>
        <div onClick={() => setActiveTab('planner')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer transition-all">
          <FileText className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Plano de Negócios</h3>
          <p className="text-gray-400">Gere um plano estruturado</p>
        </div>
        <div onClick={() => setActiveTab('marketing')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer transition-all">
          <TrendingUp className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Estratégia Marketing</h3>
          <p className="text-gray-400">Plano de marketing 30 dias</p>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <DollarSign className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white">Calculadora de Precificação</h2>
        <p className="text-gray-400 mt-2">Descubra o preço ideal baseado em seus custos e mercado</p>
      </div>

      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 space-y-4">
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
          <h3 className="text-green-400 font-semibold mb-2">Por que precificar corretamente?</h3>
          <p className="text-gray-300 text-sm">Um erro de 10% no preço pode significar 50% menos lucro. Esta calculadora considera seus custos reais, mercado e estratégia para encontrar o preço que maximiza seus resultados.</p>
        </div>

        <div>
          <label className="text-gray-300 text-sm block mb-2">Produto ou Serviço</label>
          <textarea 
            value={pricingForm.produto} 
            onChange={(e) => setPricingForm({...pricingForm, produto: e.target.value})} 
            className="w-full bg-black border border-gray-700 rounded p-3 text-white" 
            rows="2" 
            placeholder="Ex: Consultoria de marketing digital, Curso online de Excel, Desenvolvimento de site..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">Custos Fixos Mensais (R$)</label>
            <input 
              type="number"
              value={pricingForm.custosFixos} 
              onChange={(e) => setPricingForm({...pricingForm, custosFixos: e.target.value})} 
              className="w-full bg-black border border-gray-700 rounded p-3 text-white" 
              placeholder="Ex: 2000"
            />
            <p className="text-xs text-gray-500 mt-1">Aluguel, internet, ferramentas, salários...</p>
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-2">Custos Variáveis por Unidade (R$)</label>
            <input 
              type="number"
              value={pricingForm.custosVariaveis} 
              onChange={(e) => setPricingForm({...pricingForm, custosVariaveis: e.target.value})} 
              className="w-full bg-black border border-gray-700 rounded p-3 text-white" 
              placeholder="Ex: 50"
            />
            <p className="text-xs text-gray-500 mt-1">Material, comissão, entrega por venda...</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">Tempo de Produção ou Entrega</label>
            <select 
              value={pricingForm.tempoProducao} 
              onChange={(e) => setPricingForm({...pricingForm, tempoProducao: e.target.value})} 
              className="w-full bg-black border border-gray-700 rounded p-3 text-white"
            >
              <option value="">Selecione...</option>
              <option value="Imediato">Imediato (digital ou automático)</option>
              <option value="1-3 dias">1 a 3 dias</option>
              <option value="1 semana">1 semana</option>
              <option value="2-4 semanas">2 a 4 semanas</option>
              <option value="1-3 meses">1 a 3 meses</option>
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-2">Margem de Lucro Desejada (%)</label>
            <input 
              type="number"
              value={pricingForm.margemDesejada} 
              onChange={(e) => setPricingForm({...pricingForm, margemDesejada: e.target.value})} 
              className="w-full bg-black border border-gray-700 rounded p-3 text-white" 
              placeholder="Ex: 40"
            />
            <p className="text-xs text-gray-500 mt-1">Típico: produtos 30-50%, serviços 50-70%</p>
          </div>
        </div>

        <div>
          <label className="text-gray-300 text-sm block mb-2">Preço da Concorrência (R$)</label>
          <input 
            type="number"
            value={pricingForm.concorrentePreco} 
            onChange={(e) => setPricingForm({...pricingForm, concorrentePreco: e.target.value})} 
            className="w-full bg-black border border-gray-700 rounded p-3 text-white" 
            placeholder="Ex: 500"
          />
          <p className="text-xs text-gray-500 mt-1">Pesquise 3-5 concorrentes e use a média</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">Segmento de Mercado</label>
            <select 
              value={pricingForm.segmento} 
              onChange={(e) => setPricingForm({...pricingForm, segmento: e.target.value})} 
              className="w-full bg-black border border-gray-700 rounded p-3 text-white"
            >
              <option value="">Selecione...</option>
              <option value="Economia">Economia (preço baixo)</option>
              <option value="Popular">Popular (bom custo-benefício)</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Premium">Premium (alta qualidade)</option>
              <option value="Luxo">Luxo (exclusividade)</option>
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-2">Sua Experiência</label>
            <select 
              value={pricingForm.experiencia} 
              onChange={(e) => setPricingForm({...pricingForm, experiencia: e.target.value})} 
              className="w-full bg-black border border-gray-700 rounded p-3 text-white"
            >
              <option value="">Selecione...</option>
              <option value="Iniciante">Iniciante (menos de 1 ano)</option>
              <option value="Intermediário">Intermediário (1-3 anos)</option>
              <option value="Avançado">Avançado (3-5 anos)</option>
              <option value="Especialista">Especialista (5+ anos)</option>
            </select>
          </div>
        </div>

        <button 
          onClick={calculatePricing} 
          disabled={loading || !pricingForm.produto || !pricingForm.custosFixos || !pricingForm.custosVariaveis} 
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          {loading ? 'Calculando Preço Ideal...' : 'Calcular Precificação Estratégica'}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          {result.frase_impacto && (
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-800/50 border border-green-500/50 rounded-lg p-4 text-center">
              <p className="text-lg italic text-green-100 font-semibold">{result.frase_impacto}</p>
            </div>
          )}

          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Sua Estratégia de Preços</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
                <div className="text-yellow-400 text-sm font-semibold mb-2">PREÇO MÍNIMO</div>
                <div className="text-3xl font-bold text-white">R$ {result.preco_minimo}</div>
                <div className="text-xs text-gray-400 mt-2">Cobre custos + mínimo lucro</div>
              </div>

              <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-4 text-center transform scale-105">
                <div className="text-green-400 text-sm font-semibold mb-2">PREÇO IDEAL</div>
                <div className="text-4xl font-bold text-green-400">R$ {result.preco_ideal}</div>
                <div className="text-xs text-green-300 mt-2 font-semibold">RECOMENDADO</div>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-center">
                <div className="text-purple-400 text-sm font-semibold mb-2">PREÇO PREMIUM</div>
                <div className="text-3xl font-bold text-white">R$ {result.preco_premium}</div>
                <div className="text-xs text-gray-400 mt-2">Posicionamento alto valor</div>
              </div>
            </div>

            {result.analise_completa && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3">Análise Financeira</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Custo Total por Unidade:</span>
                    <span className="text-white font-semibold ml-2">R$ {result.analise_completa.custo_total_unitario}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Margem Líquida (ideal):</span>
                    <span className="text-green-400 font-semibold ml-2">{result.analise_completa.margem_liquida_ideal}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ponto de Equilíbrio:</span>
                    <span className="text-white font-semibold ml-2">{result.analise_completa.ponto_equilibrio_mensal} vendas por mês</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Posicionamento:</span>
                    <span className="text-purple-400 font-semibold ml-2">{result.analise_completa.posicionamento_mercado}</span>
                  </div>
                </div>
              </div>
            )}

            {result.estrategia_precificacao && (
              <div className="space-y-4 mb-6">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-blue-400 font-semibold mb-2">Recomendação Principal</h4>
                  <p className="text-gray-300">{result.estrategia_precificacao.recomendacao_principal}</p>
                </div>

                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Justificativa Estratégica</h4>
                  <p className="text-gray-300 text-sm">{result.estrategia_precificacao.justificativa}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-gray-800/20 border border-gray-700 rounded p-3">
                    <div className="text-yellow-400 text-xs font-semibold mb-1">Use Preço Mínimo quando:</div>
                    <p className="text-gray-300 text-xs">{result.estrategia_precificacao.quando_usar_minimo}</p>
                  </div>
                  <div className="bg-gray-800/20 border border-gray-700 rounded p-3">
                    <div className="text-green-400 text-xs font-semibold mb-1">Use Preço Ideal quando:</div>
                    <p className="text-gray-300 text-xs">{result.estrategia_precificacao.quando_usar_ideal}</p>
                  </div>
                  <div className="bg-gray-800/20 border border-gray-700 rounded p-3">
                    <div className="text-purple-400 text-xs font-semibold mb-1">Use Preço Premium quando:</div>
                    <p className="text-gray-300 text-xs">{result.estrategia_precificacao.quando_usar_premium}</p>
                  </div>
                </div>
              </div>
            )}

            {result.comparativo_concorrencia && (
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-6">
                <h4 className="text-orange-400 font-semibold mb-2">Comparativo com Concorrência</h4>
                <p className="text-gray-300 text-sm mb-2">{result.comparativo_concorrencia.analise}</p>
                <p className="text-gray-400 text-xs">Vantagem: {result.comparativo_concorrencia.vantagem_competitiva}</p>
              </div>
            )}

            {result.alertas_importantes && result.alertas_importantes.length > 0 && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <h4 className="text-red-400 font-semibold mb-2">Alertas Importantes</h4>
                <ul className="space-y-1">
                  {result.alertas_importantes.map((alerta, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {alerta}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.proximos_passos && result.proximos_passos.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2">Próximos Passos</h4>
                <ol className="space-y-2">
                  {result.proximos_passos.map((passo, i) => (
                    <li key={i} className="text-gray-300 text-sm">{i + 1}. {passo}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {result && result.error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">
          {result.message}
        </div>
      )}
    </div>
  );

  const renderDiagnostic = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-white">Diagnóstico Rápido</h2>
      <div className="bg-gray-900 border border-blue-500/30 rounded-lg p-6 space-y-4">
        <p className="text-gray-300 mb-4">Responda as perguntas para descobrir a saúde do seu negócio</p>
        
        <select value={diagnosticForm.temNegocio} onChange={(e) => setDiagnosticForm({...diagnosticForm, temNegocio: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">1. Tem negócio funcionando?</option>
          <option value="Sim, funcionando">Sim, funcionando</option>
          <option value="Sim, mas parado">Sim, mas parado</option>
          <option value="Não, só tenho ideia">Não, só tenho ideia</option>
        </select>
        
        <select value={diagnosticForm.faturamentoMensal} onChange={(e) => setDiagnosticForm({...diagnosticForm, faturamentoMensal: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">2. Faturamento mensal?</option>
          <option value="Não faturei">Ainda não faturei</option>
          <option value="Até 5k">Até R$ 5 mil</option>
          <option value="5-20k">R$ 5 a 20 mil</option>
          <option value="20k+">Acima R$ 20 mil</option>
        </select>
        
        <select value={diagnosticForm.tempoMercado} onChange={(e) => setDiagnosticForm({...diagnosticForm, tempoMercado: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">3. Tempo no mercado?</option>
          <option value="Menos de 6 meses">Menos de 6 meses</option>
          <option value="6 meses a 1 ano">6 meses a 1 ano</option>
          <option value="1 a 3 anos">1 a 3 anos</option>
          <option value="Mais de 3 anos">Mais de 3 anos</option>
        </select>
        
        <select value={diagnosticForm.principalDesafio} onChange={(e) => setDiagnosticForm({...diagnosticForm, principalDesafio: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">4. Principal desafio?</option>
          <option value="Conseguir clientes">Conseguir clientes</option>
          <option value="Precificação">Precificação</option>
          <option value="Marketing">Marketing e divulgação</option>
          <option value="Organização">Organização financeira</option>
          <option value="Escalar">Escalar o negócio</option>
        </select>
        
        <select value={diagnosticForm.temClientes} onChange={(e) => setDiagnosticForm({...diagnosticForm, temClientes: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">5. Tem clientes recorrentes?</option>
          <option value="Sim, vários">Sim, vários</option>
          <option value="Poucos">Poucos</option>
          <option value="Não tenho">Não tenho</option>
        </select>
        
        <select value={diagnosticForm.fazMarketing} onChange={(e) => setDiagnosticForm({...diagnosticForm, fazMarketing: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">6. Faz marketing?</option>
          <option value="Sim, estruturado">Sim, de forma estruturada</option>
          <option value="Sim, sem estratégia">Sim, mas sem estratégia</option>
          <option value="Não faço">Não faço</option>
        </select>
        
        <select value={diagnosticForm.controlaFinancas} onChange={(e) => setDiagnosticForm({...diagnosticForm, controlaFinancas: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">7. Controla finanças?</option>
          <option value="Sim, em sistema">Sim, em planilha ou sistema</option>
          <option value="Sim, de cabeça">Sim, mas de cabeça</option>
          <option value="Não controlo">Não controlo</option>
        </select>
        
        <select value={diagnosticForm.temEquipe} onChange={(e) => setDiagnosticForm({...diagnosticForm, temEquipe: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">8. Tem equipe?</option>
          <option value="Tenho equipe">Tenho equipe</option>
          <option value="Freelancers">Freelancers ocasionais</option>
          <option value="Sozinho">Trabalho sozinho</option>
        </select>
        
        <select value={diagnosticForm.objetivoPrincipal} onChange={(e) => setDiagnosticForm({...diagnosticForm, objetivoPrincipal: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">9. Objetivo principal agora?</option>
          <option value="Validar ideia">Validar minha ideia</option>
          <option value="Primeiros clientes">Conseguir primeiros clientes</option>
          <option value="Aumentar faturamento">Aumentar faturamento</option>
          <option value="Organizar">Organizar o negócio</option>
          <option value="Escalar">Escalar e crescer</option>
        </select>
        
        <select value={diagnosticForm.investirAgora} onChange={(e) => setDiagnosticForm({...diagnosticForm, investirAgora: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
          <option value="">10. Pode investir no negócio?</option>
          <option value="Sim, tenho recurso">Sim, tenho recurso</option>
          <option value="Pouco">Pouco, mas tenho algo</option>
          <option value="Não tenho">Não tenho nada agora</option>
        </select>
        
        <button onClick={generateDiagnostic} disabled={loading || !diagnosticForm.temNegocio || !diagnosticForm.faturamentoMensal || !diagnosticForm.principalDesafio} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Analisando...' : 'Gerar Diagnóstico Completo'}
        </button>
      </div>
      
      {result && !result.error && (
        <div className="space-y-4">
          {result.frase_impacto && (
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/50 rounded-lg p-4 text-center">
              <p className="text-lg italic text-blue-100 font-semibold">{result.frase_impacto}</p>
            </div>
          )}
          
          <div className="bg-gray-900 border border-blue-500/30 rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Seu Diagnóstico</h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-400">{result.score_geral}/100</div>
                <div className="text-sm text-gray-400">{result.nivel}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Suas Forças</h4>
                <ul className="space-y-1">
                  {result.forcas?.map((f, i) => <li key={i} className="text-gray-300">• {f}</li>)}
                </ul>
              </div>
              
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Pontos de Atenção</h4>
                <ul className="space-y-1">
                  {result.fraquezas?.map((f, i) => <li key={i} className="text-gray-300">• {f}</li>)}
                </ul>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">Prioridades Imediatas</h4>
                <ol className="space-y-1">
                  {result.prioridades?.map((p, i) => <li key={i} className="text-gray-300">{i+1}. {p}</li>)}
                </ol>
              </div>
              
              {result.recomendacao_ferramenta && (
                <div className="bg-blue-900/30 border border-blue-500/30 rounded p-4 mt-4">
                  <h4 className="text-blue-400 font-bold mb-2">Recomendação MentorIA</h4>
                  <p className="text-white">Use agora: <span className="font-bold">{result.recomendacao_ferramenta}</span></p>
                </div>
              )}
              
              {result.proximos_passos && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Próximos Passos</h4>
                  <ol className="space-y-1">
                    {result.proximos_passos.map((p, i) => <li key={i} className="text-gray-300">{i+1}. {p}</li>)}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {result && result.error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">
          {result.message}
        </div>
      )}
    </div>
  );

  const renderValidator = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-white">Validador de Ideias</h2>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <textarea value={ideaForm.idea} onChange={(e) => setIdeaForm({...ideaForm, idea: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" rows="4" placeholder="Descreva sua ideia" />
        <input value={ideaForm.target} onChange={(e) => setIdeaForm({...ideaForm, target: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Público-alvo" />
        <input value={ideaForm.problem} onChange={(e) => setIdeaForm({...ideaForm, problem: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Problema que resolve" />
        <button onClick={analyzeIdea} disabled={loading || !ideaForm.idea} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white font-bold py-3 rounded">
          {loading ? 'Analisando...' : 'Analisar Ideia'}
        </button>
      </div>
      {result && !result.error && (
        <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">Análise</h3>
            <div><div className="text-3xl font-bold text-green-400">{result.score}/100</div><div className="text-sm text-gray-400">{result.viabilidade}</div></div>
          </div>
          {result.frase_impacto && <p className="italic text-green-200 mb-4">{result.frase_impacto}</p>}
          <div className="space-y-3">
            <div><h4 className="text-green-400 font-semibold">Pontos Fortes</h4><ul>{result.pontos_fortes?.map((p, i) => <li key={i} className="text-gray-300">• {p}</li>)}</ul></div>
            <div><h4 className="text-yellow-400 font-semibold">Atenção</h4><ul>{result.pontos_atencao?.map((p, i) => <li key={i} className="text-gray-300">• {p}</li>)}</ul></div>
            <div><h4 className="text-purple-400 font-semibold">Próximos Passos</h4><ol>{result.proximos_passos?.map((p, i) => <li key={i} className="text-gray-300">{i+1}. {p}</li>)}</ol></div>
          </div>
        </div>
      )}
      {result && result.error && <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">{result.message}</div>}
    </div>
  );

  const renderPlanner = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-white">Plano de Negócios</h2>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <textarea value={businessForm.business} onChange={(e) => setBusinessForm({...businessForm, business: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" rows="3" placeholder="Descreva seu negócio" />
        <input value={businessForm.market} onChange={(e) => setBusinessForm({...businessForm, market: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Como é o mercado" />
        <input value={businessForm.investment} onChange={(e) => setBusinessForm({...businessForm, investment: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Investimento disponível (R$)" />
        <button onClick={generateBusinessPlan} disabled={loading || !businessForm.business} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white font-bold py-3 rounded">
          {loading ? 'Gerando...' : 'Gerar Plano'}
        </button>
      </div>
      {result && !result.error && (
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6">
          {result.frase_impacto && <p className="italic text-purple-200 mb-4 text-center">{result.frase_impacto}</p>}
          <h3 className="text-2xl font-bold text-white mb-4">Seu Plano</h3>
          <div className="space-y-3">
            <div><h4 className="text-purple-400 font-semibold">Resumo Executivo</h4><p className="text-gray-300">{result.resumo_executivo}</p></div>
            {result.analise_mercado && (
              <div><h4 className="text-purple-400 font-semibold">Mercado</h4><p className="text-gray-300 text-sm">{result.analise_mercado.tamanho_mercado}</p></div>
            )}
            {result.estrategia_receita && (
              <div><h4 className="text-green-400 font-semibold">Receita</h4><p className="text-gray-300 text-sm">{result.estrategia_receita.precificacao}</p></div>
            )}
          </div>
        </div>
      )}
      {result && result.error && <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">{result.message}</div>}
    </div>
  );

  const renderMarketing = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-white">Estratégia de Marketing</h2>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <textarea value={marketingForm.product} onChange={(e) => setMarketingForm({...marketingForm, product: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" rows="3" placeholder="Produto ou serviço" />
        <input value={marketingForm.audience} onChange={(e) => setMarketingForm({...marketingForm, audience: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Público-alvo" />
        <input value={marketingForm.budget} onChange={(e) => setMarketingForm({...marketingForm, budget: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Orçamento (R$ ou zero)" />
        <button onClick={generateMarketingStrategy} disabled={loading || !marketingForm.product} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white font-bold py-3 rounded">
          {loading ? 'Gerando...' : 'Gerar Estratégia'}
        </button>
      </div>
      {result && !result.error && (
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6">
          {result.frase_impacto && <p className="italic text-purple-200 mb-4 text-center">{result.frase_impacto}</p>}
          <h3 className="text-2xl font-bold text-white mb-4">Sua Estratégia</h3>
          <div className="space-y-3">
            <div><h4 className="text-purple-400 font-semibold">Canais</h4><ul>{result.canais_prioritarios?.map((c, i) => <li key={i} className="text-gray-300 text-sm">• {c}</li>)}</ul></div>
            <div><h4 className="text-green-400 font-semibold">Primeiras Ações</h4><ol>{result.primeiras_acoes?.map((a, i) => <li key={i} className="text-gray-300 text-sm">{i+1}. {a}</li>)}</ol></div>
            <div><h4 className="text-blue-400 font-semibold">30 Dias</h4><ul>{result.calendario_30dias?.map((s, i) => <li key={i} className="text-gray-300 text-sm">• {s}</li>)}</ul></div>
          </div>
        </div>
      )}
      {result && result.error && <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">{result.message}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-xl font-bold">MentorIA</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <button onClick={() => {setActiveTab('home'); setResult(null);}} className={`px-4 py-2 rounded ${activeTab === 'home' ? 'bg-purple-600' : 'text-gray-300'}`}>Início</button>
              <button onClick={() => {setActiveTab('pricing'); setResult(null);}} className={`px-4 py-2 rounded ${activeTab === 'pricing' ? 'bg-purple-600' : 'text-gray-300'}`}>Preços</button>
              <button onClick={() => {setActiveTab('diagnostic'); setResult(null);}} className={`px-4 py-2 rounded ${activeTab === 'diagnostic' ? 'bg-purple-600' : 'text-gray-300'}`}>Diagnóstico</button>
              <button onClick={() => {setActiveTab('validator'); setResult(null);}} className={`px-4 py-2 rounded ${activeTab === 'validator' ? 'bg-purple-600' : 'text-gray-300'}`}>Validador</button>
              <button onClick={() => {setActiveTab('planner'); setResult(null);}} className={`px-4 py-2 rounded ${activeTab === 'planner' ? 'bg-purple-600' : 'text-gray-300'}`}>Plano</button>
              <button onClick={() => {setActiveTab('marketing'); setResult(null);}} className={`px-4 py-2 rounded ${activeTab === 'marketing' ? 'bg-purple-600' : 'text-gray-300'}`}>Marketing</button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">{mobileMenuOpen ? <X /> : <Menu />}</button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button onClick={() => {setActiveTab('home'); setMobileMenuOpen(false); setResult(null);}} className="block w-full text-left px-4 py-2 rounded bg-gray-800">Início</button>
              <button onClick={() => {setActiveTab('pricing'); setMobileMenuOpen(false); setResult(null);}} className="block w-full text-left px-4 py-2 rounded bg-gray-800">Preços</button>
              <button onClick={() => {setActiveTab('diagnostic'); setMobileMenuOpen(false); setResult(null);}} className="block w-full text-left px-4 py-2 rounded bg-gray-800">Diagnóstico</button>
              <button onClick={() => {setActiveTab('validator'); setMobileMenuOpen(false); setResult(null);}} className="block w-full text-left px-4 py-2 rounded bg-gray-800">Validador</button>
              <button onClick={() => {setActiveTab('planner'); setMobileMenuOpen(false); setResult(null);}} className="block w-full text-left px-4 py-2 rounded bg-gray-800">Plano</button>
              <button onClick={() => {setActiveTab('marketing'); setMobileMenuOpen(false); setResult(null);}} className="block w-full text-left px-4 py-2 rounded bg-gray-800">Marketing</button>
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'pricing' && renderPricing()}
        {activeTab === 'diagnostic' && renderDiagnostic()}
        {activeTab === 'validator' && renderValidator()}
        {activeTab === 'planner' && renderPlanner()}
        {activeTab === 'marketing' && renderMarketing()}
      </main>
      <footer className="bg-gray-900 border-t border-purple-500/30 mt-20 py-8 text-center text-gray-400">
        <p>MentorIA - Seu mentor de negócios com IA</p>
      </footer>
    </div>
  );
};

export default MentorIA;
