import React, { useState } from 'react';
import { Lightbulb, FileText, TrendingUp, Menu, X, Sparkles, CheckCircle, AlertCircle, Download, DollarSign, Zap, Mic } from 'lucide-react';

const GROQ_API_KEY = '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';

const MentorIA = () => {
  // --- ESTADOS ---
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // Estados dos formulários
  const [ideaForm, setIdeaForm] = useState({ idea: '', target: '', problem: '' });
  const [businessForm, setBusinessForm] = useState({ business: '', market: '', investment: '', timeline: '', experience: '', competitors: '', differentials: '' });
  const [marketingForm, setMarketingForm] = useState({ product: '', audience: '', budget: '' });
  const [pricingForm, setPricingForm] = useState({ produto: '', custosFixos: '', custosVariaveis: '', tempoProducao: '', margemDesejada: '', concorrentePreco: '', segmento: '', experiencia: '' });
  const [diagnosticForm, setDiagnosticForm] = useState({ businessName: '', stage: '', monthlyRevenue: '', teamSize: '', mainChallenge: '' });
  const [pitchForm, setPitchForm] = useState({ businessName: '', problemStatement: '', solution: '', differentiator: '' });

  // --- FUNÇÕES DE LÓGICA (API) ---

  const analyzeIdea = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'system',
            content: 'Você é um mentor de negócios de elite. Sempre retorne JSON válido.'
          }, {
            role: 'user',
            content: `Analise esta ideia como um mentor de negócios internacional de elite, que cobra R$ 50 mil por hora. Use linguagem acessível, mas com profundidade estratégica. Seja honesto, direto e pragmático — sem rodeios ou motivação genérica. Aponte de forma clara as forças, riscos e próximos passos práticos, sempre com foco em ação e viabilidade real.

IDEIA: ${ideaForm.idea}
PÚBLICO: ${ideaForm.target}
PROBLEMA: ${ideaForm.problem}

Retorne APENAS este JSON válido (sem markdown, sem texto adicional  ):
{
  "score": 85,
  "viabilidade": "alta",
  "frase_impacto": "Uma frase curta e direta que captura a essência estratégica desta ideia (estilo Peter Thiel ou Jim Collins)",
  "pontos_fortes": ["Força 1 explicada em frase curta", "Força 2 objetiva", "Força 3 prática"],
  "pontos_atencao": ["Atenção 1 real", "Atenção 2 crítica"],
  "proximos_passos": ["Ação prática 1", "Ação 2 clara", "Ação 3 mensurável"]
}`
          }],
          temperature: 0.7,
          max_tokens: 1500
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
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
          messages: [{
            role: 'system',
            content: 'Você é consultor de negócios elite. Retorne JSON válido.'
          }, {
            role: 'user',
            content: `Crie um plano de negócios robusto como faria um consultor estratégico global, que cobra R$ 50 mil por hora. Use linguagem simples, clara e realista. Traga números e estimativas sempre que possível, com foco em ROI, execução e priorização. Dê exemplos práticos e ações que um empreendedor iniciante possa aplicar imediatamente.

NEGÓCIO: ${businessForm.business}
MERCADO: ${businessForm.market}
INVESTIMENTO: ${businessForm.investment}
PRAZO: ${businessForm.timeline}
EXPERIÊNCIA: ${businessForm.experience}
CONCORRENTES: ${businessForm.competitors}
DIFERENCIAIS: ${businessForm.differentials}

Retorne APENAS este JSON válido (sem markdown, sem explicações extras  ):
{
  "frase_impacto": "Uma frase curta e direta que captura a essência estratégica deste negócio (estilo Simon Sinek ou Peter Thiel)",
  "resumo_executivo": "Resumo em 2-3 frases com clareza e impacto.",
  "analise_mercado": { "tamanho_mercado": "Tamanho estimado com números ou percentuais.", "publico_alvo": "Descrição objetiva do público.", "tendencias": "Tendências atuais que influenciam o setor." },
  "estrutura_custos": { "investimento_inicial": ["Item 1: R$ valor", "Item 2: R$ valor"], "custos_fixos_mensais": ["Custo 1: R$ valor/mês", "Custo 2: R$ valor/mês"], "custos_variaveis": ["Item 1 variável", "Item 2 variável"] },
  "estrategia_receita": { "fontes_receita": ["Fonte 1", "Fonte 2"], "precificacao": "Estratégia direta de precificação.", "projecao_mensal": "Projeção realista mês a mês." },
  "vantagens_competitivas": ["Diferencial 1", "Diferencial 2", "Diferencial 3"],
  "analise_riscos": [ {"risco": "Risco relevante", "mitigacao": "Ação prática"}, {"risco": "Outro risco", "mitigacao": "Solução concreta"} ],
  "roadmap_90dias": { "mes1": ["Ação 1", "Ação 2"], "mes2": ["Ação 1", "Ação 2"], "mes3": ["Ação 1", "Ação 2"] },
  "kpis": ["KPI 1 com meta numérica", "KPI 2 com indicador claro"]
}`
          }],
          temperature: 0.7,
          max_tokens: 3000
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
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
          messages: [{
            role: 'system',
            content: 'Você é estrategista de marketing elite. Retorne JSON válido.'
          }, {
            role: 'user',
            content: `Crie uma estratégia de marketing premium como faria um estrategista internacional de alto nível, que cobra R$ 50 mil por hora. Use linguagem simples, prática e com foco em resultados rápidos e mensuráveis. Priorize canais de baixo custo e alto impacto, e um calendário acionável de 30 dias.

PRODUTO: ${marketingForm.product}
PÚBLICO: ${marketingForm.audience}
ORÇAMENTO: ${marketingForm.budget}

Retorne APENAS este JSON válido (sem markdown, sem texto adicional  ):
{
  "frase_impacto": "Uma frase curta e direta que captura a essência desta estratégia (estilo Seth Godin ou Gary Vee)",
  "canais_prioritarios": ["Canal 1 com explicação objetiva", "Canal 2", "Canal 3"],
  "primeiras_acoes": ["Ação inicial prática 1", "Ação 2 específica", "Ação 3 rápida"],
  "calendario_30dias": [ "Semana 1: ações claras", "Semana 2: execução e ajustes", "Semana 3: otimização", "Semana 4: consolidação de resultados" ],
  "metricas_acompanhar": ["Métrica 1 com meta numérica", "Métrica 2 com resultado esperado"]
}`
          }],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(text));
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
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

Retorne APENAS este JSON (sem markdown, sem texto extra  ):
{
  "preco_minimo": "500.00",
  "preco_ideal": "850.00",
  "preco_premium": "1200.00",
  "frase_impacto": "Frase sobre precificação",
  "analise_completa": { "custo_total_unitario": "280.00", "margem_liquida_ideal": "67", "ponto_equilibrio_mensal": "15", "posicionamento_mercado": "Premium" },
  "estrategia_precificacao": { "recomendacao_principal": "Recomendação clara", "justificativa": "Justificativa da estratégia", "quando_usar_minimo": "Quando usar mínimo", "quando_usar_ideal": "Quando usar ideal", "quando_usar_premium": "Quando usar premium" },
  "comparativo_concorrencia": { "analise": "Análise vs concorrente", "vantagem_competitiva": "Vantagem competitiva" },
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
      const content = data.choices[0].message.content.replace(/```json\n?|\n?```/g, '').trim();
      setResult(JSON.parse(content));
    } catch (error) {
      console.error('Erro completo:', error);
      setResult({ error: true, message: `Erro ao calcular: ${error.message || 'Tente novamente'}` });
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
          messages: [{ role: 'system', content: 'Você é um consultor de negócios de elite. Retorne APENAS JSON válido.' }, {
            role: 'user', content: `Faça um diagnóstico profundo do negócio.
NEGÓCIO: ${diagnosticForm.businessName} | ESTÁGIO: ${diagnosticForm.stage} | RECEITA MENSAL: ${diagnosticForm.monthlyRevenue} | TIME: ${diagnosticForm.teamSize} | DESAFIO: ${diagnosticForm.mainChallenge}
Retorne APENAS este JSON: {"overallScore": 75, "frase_impacto": "Frase curta sobre o momento do negócio.", "strengths": ["Força 1", "Força 2"], "weaknesses": ["Fraqueza 1", "Fraqueza 2"], "priorities": ["Prioridade 1", "Prioridade 2"]}`
          }],
          temperature: 0.7, max_tokens: 1500, response_format: { type: "json_object" }
        } )
      });
      const data = await response.json();
      if (!data.choices?.[0]) throw new Error('Resposta inválida');
      setResult(JSON.parse(data.choices[0].message.content));
    } catch (error) {
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
    }
    setLoading(false);
  };

  const generateElevatorPitch = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: 'Você é um especialista em comunicação e pitch de negócios. Retorne APENAS JSON válido.' }, {
            role: 'user', content: `Crie pitches de elevador impactantes.
NEGÓCIO: ${pitchForm.businessName} | PROBLEMA: ${pitchForm.problemStatement} | SOLUÇÃO: ${pitchForm.solution} | DIFERENCIAL: ${pitchForm.differentiator}
Retorne APENAS este JSON: {"pitch30": "Pitch de 30 segundos.", "pitch60": "Pitch de 60 segundos.", "pitch120": "Pitch de 2 minutos.", "tips": ["Dica 1", "Dica 2"]}`
          }],
          temperature: 0.7, max_tokens: 1500, response_format: { type: "json_object" }
        } )
      });
      const data = await response.json();
      if (!data.choices?.[0]) throw new Error('Resposta inválida');
      setResult(JSON.parse(data.choices[0].message.content));
    } catch (error) {
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
    }
    setLoading(false);
  };

  const exportToPDF = () => {
    const content = document.getElementById('result-content');
    if (!content) return;
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>MentorIA - Análise Profissional</title>');
    printWindow.document.write('<style>body{font-family:Arial;padding:40px;color:#333;line-height:1.6}h1{color:#7c3aed;border-bottom:3px solid #7c3aed;padding-bottom:10px;margin-bottom:30px}h2{color:#7c3aed;margin-top:30px;margin-bottom:15px}h3{color:#8b5cf6;margin-top:20px}ul,ol{margin-left:20px}li{margin-bottom:8px}.footer{margin-top:50px;text-align:center;color:#666;font-size:12px;border-top:1px solid #ddd;padding-top:20px}</style></head><body>');
    printWindow.document.write('<h1>Análise Profissional - MentorIA</h1>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('<div class="footer">Gerado por MentorIA</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
  };

  // --- FUNÇÕES DE RENDERIZAÇÃO (JSX) ---

  const renderHome = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center"><Sparkles className="w-16 h-16 text-purple-500" /></div>
        <h1 className="text-4xl font-bold text-white">MentorIA</h1>
        <p className="text-xl text-gray-300">Seu mentor de negócios com inteligência artificial</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div onClick={() => setActiveTab('validator')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer"><Lightbulb className="w-12 h-12 text-purple-500 mb-4" /><h3 className="text-xl font-bold text-white mb-2">Validador de Ideias</h3><p className="text-gray-400">Analise a viabilidade da sua ideia.</p></div>
        <div onClick={() => setActiveTab('diagnostic')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer"><Zap className="w-12 h-12 text-purple-500 mb-4" /><h3 className="text-xl font-bold text-white mb-2">Diagnóstico Rápido</h3><p className="text-gray-400">Avalie a saúde do seu negócio.</p></div>
        <div onClick={() => setActiveTab('planner')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer"><FileText className="w-12 h-12 text-purple-500 mb-4" /><h3 className="text-xl font-bold text-white mb-2">Plano de Negócios</h3><p className="text-gray-400">Gere um plano estruturado.</p></div>
        <div onClick={() => setActiveTab('marketing')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer"><TrendingUp className="w-12 h-12 text-purple-500 mb-4" /><h3 className="text-xl font-bold text-white mb-2">Estratégia de Marketing</h3><p className="text-gray-400">Crie um plano para 30 dias.</p></div>
        <div onClick={() => setActiveTab('pitch')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 cursor-pointer"><Mic className="w-12 h-12 text-purple-500 mb-4" /><h3 className="text-xl font-bold text-white mb-2">Pitch de Elevador</h3><p className="text-gray-400">Gere discursos de venda rápidos.</p></div>
        <div onClick={() => setActiveTab('pricing')} className="bg-gray-900 border border-green-500/30 rounded-lg p-6 hover:border-green-500 cursor-pointer"><DollarSign className="w-12 h-12 text-green-500 mb-4" /><h3 className="text-xl font-bold text-white mb-2">Calculadora de Preços</h3><p className="text-gray-400">Descubra o preço ideal.</p></div>
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
          <textarea value={pricingForm.produto} onChange={(e) => setPricingForm({ ...pricingForm, produto: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white" rows="2" placeholder="Ex: Consultoria de marketing digital, Curso online de Excel, Desenvolvimento de site..." />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">Custos Fixos Mensais (R$)</label>
            <input type="number" value={pricingForm.custosFixos} onChange={(e) => setPricingForm({ ...pricingForm, custosFixos: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Ex: 2000" />
            <p className="text-xs text-gray-500 mt-1">Aluguel, internet, ferramentas, salários...</p>
          </div>
          <div>
            <label className="text-gray-300 text-sm block mb-2">Custos Variáveis por Unidade (R$)</label>
            <input type="number" value={pricingForm.custosVariaveis} onChange={(e) => setPricingForm({ ...pricingForm, custosVariaveis: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Ex: 50" />
            <p className="text-xs text-gray-500 mt-1">Material, comissão, entrega por venda...</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">Tempo de Produção ou Entrega</label>
            <select value={pricingForm.tempoProducao} onChange={(e) => setPricingForm({ ...pricingForm, tempoProducao: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
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
            <input type="number" value={pricingForm.margemDesejada} onChange={(e) => setPricingForm({ ...pricingForm, margemDesejada: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Ex: 40" />
            <p className="text-xs text-gray-500 mt-1">Típico: produtos 30-50%, serviços 50-70%</p>
          </div>
        </div>
        <div>
          <label className="text-gray-300 text-sm block mb-2">Preço da Concorrência (R$)</label>
          <input type="number" value={pricingForm.concorrentePreco} onChange={(e) => setPricingForm({ ...pricingForm, concorrentePreco: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white" placeholder="Ex: 500" />
          <p className="text-xs text-gray-500 mt-1">Pesquise 3-5 concorrentes e use a média</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">Segmento de Mercado</label>
            <select value={pricingForm.segmento} onChange={(e) => setPricingForm({ ...pricingForm, segmento: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
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
            <select value={pricingForm.experiencia} onChange={(e) => setPricingForm({ ...pricingForm, experiencia: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white">
              <option value="">Selecione...</option>
              <option value="Iniciante">Iniciante (menos de 1 ano)</option>
              <option value="Intermediário">Intermediário (1-3 anos)</option>
              <option value="Avançado">Avançado (3-5 anos)</option>
              <option value="Especialista">Especialista (5+ anos)</option>
            </select>
          </div>
        </div>
        <button onClick={calculatePricing} disabled={loading || !pricingForm.produto || !pricingForm.custosFixos || !pricingForm.custosVariaveis} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Calculando Preço Ideal...' : 'Calcular Precificação Estratégica'}
        </button>
      </div>
      {result && !result.error && activeTab === 'pricing' && (
        <div id="result-content" className="space-y-4">
          {result.frase_impacto && (<div className="bg-gradient-to-r from-green-900/50 to-emerald-800/50 border border-green-500/50 rounded-lg p-4 text-center"><p className="text-lg italic text-green-100 font-semibold">{result.frase_impacto}</p></div>)}
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
                <div className="text-3xl font-
bold text-white">R$ {result.preco_premium}</div>
                <div className="text-xs text-gray-400 mt-2">Posicionamento alto valor</div>
              </div>
            </div>
            {result.analise_completa && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3">Análise Financeira</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-400">Custo Total por Unidade:</span><span className="text-white font-semibold ml-2">R$ {result.analise_completa.custo_total_unitario}</span></div>
                  <div><span className="text-gray-400">Margem Líquida (ideal):</span><span className="text-green-400 font-semibold ml-2">{result.analise_completa.margem_liquida_ideal}%</span></div>
                  <div><span className="text-gray-400">Ponto de Equilíbrio:</span><span className="text-white font-semibold ml-2">{result.analise_completa.ponto_equilibrio_mensal} vendas por mês</span></div>
                  <div><span className="text-gray-400">Posicionamento:</span><span className="text-purple-400 font-semibold ml-2">{result.analise_completa.posicionamento_mercado}</span></div>
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
                <ul className="space-y-1">{result.alertas_importantes.map((alerta, i) => (<li key={i} className="text-gray-300 text-sm">• {alerta}</li>))}</ul>
              </div>
            )}
            {result.proximos_passos && result.proximos_passos.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2">Próximos Passos</h4>
                <ol className="space-y-2">{result.proximos_passos.map((passo, i) => (<li key={i} className="text-gray-300 text-sm">{i + 1}. {passo}</li>))}</ol>
              </div>
            )}
          </div>
        </div>
      )}
      {result && result.error && (<div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">{result.message}</div>)}
    </div>
  );

  const renderValidator = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><Lightbulb className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold text-white">Validador de Ideias</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div><label className="block text-gray-300 mb-2 font-medium">Descreva sua ideia de negócio</label><textarea value={ideaForm.idea} onChange={(e) => setIdeaForm({ ...ideaForm, idea: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="4" placeholder="Ex: Aplicativo de delivery de comida saudável focado em atletas..." /></div>
        <div><label className="block text-gray-300 mb-2 font-medium">Quem é seu público-alvo?</label><input type="text" value={ideaForm.target} onChange={(e) => setIdeaForm({ ...ideaForm, target: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Atletas amadores entre 25-40 anos..." /></div>
        <div><label className="block text-gray-300 mb-2 font-medium">Que problema você resolve?</label><input type="text" value={ideaForm.problem} onChange={(e) => setIdeaForm({ ...ideaForm, problem: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Dificuldade em encontrar refeições balanceadas e práticas..." /></div>
        <button onClick={analyzeIdea} disabled={loading || !ideaForm.idea || !ideaForm.target || !ideaForm.problem} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">{loading ? 'Analisando...' : 'Analisar Ideia'}</button>
      </div>
      {result && !result.error && activeTab === 'validator' && (
        <div id="result-content" className="space-y-4">
          <div className="flex justify-end"><button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors"><Download className="w-5 h-5" />Exportar PDF</button></div>
          <div className="space-y-4">
            {result.frase_impacto && (<div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border border-green-500/50 rounded-lg p-4 text-center"><p className="text-lg italic text-green-100 font-semibold">"{result.frase_impacto}"</p></div>)}
            <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Análise Completa</h3>
                <div className="text-right"><div className="text-3xl font-bold text-green-400">{result.score}/100</div><div className="text-sm text-gray-400 uppercase">{result.viabilidade}</div></div>
              </div>
              <div className="space-y-4">
                <div><h4 className="text-lg font-semibold text-green-400 mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5" />Pontos Fortes</h4><ul className="space-y-2">{result.pontos_fortes.map((ponto, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-green-400 mt-1">•</span><span>{ponto}</span></li>))}</ul></div>
                <div><h4 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" />Pontos de Atenção</h4><ul className="space-y-2">{result.pontos_atencao.map((ponto, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-yellow-400 mt-1">•</span><span>{ponto}</span></li>))}</ul></div>
                <div><h4 className="text-lg font-semibold text-purple-400 mb-2">Próximos Passos</h4><ol className="space-y-2">{result.proximos_passos.map((passo, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400 font-bold">{idx + 1}.</span><span>{passo}</span></li>))}</ol></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {result && result.error && (<div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">{result.message}</div>)}
    </div>
  );

  const renderPlanner = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><FileText className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold text-white">Gerador de Plano de Negócios Profissional</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div><label className="block text-gray-300 mb-2 font-medium">Descreva seu negócio em detalhes</label><textarea value={businessForm.business} onChange={(e) => setBusinessForm({ ...businessForm, business: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="4" placeholder="Ex: Consultoria online de nutrição esportiva..." /></div>
        <div><label className="block text-gray-300 mb-2 font-medium">Análise de mercado</label><textarea value={businessForm.market} onChange={(e) => setBusinessForm({ ...businessForm, market: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="3" placeholder="Ex: Mercado cresceu 30% nos últimos 2 anos..." /></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-gray-300 mb-2 font-medium">Investimento disponível</label><input type="text" value={businessForm.investment} onChange={(e) => setBusinessForm({ ...businessForm, investment: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: R$ 5.000" /></div>
          <div><label className="block text-gray-300 mb-2 font-medium">Prazo para lançamento</label><input type="text" value={businessForm.timeline} onChange={(e) => setBusinessForm({ ...businessForm, timeline: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: 60 dias" /></div>
        </div>
        <div><label className="block text-gray-300 mb-2 font-medium">Sua experiência na área</label><textarea value={businessForm.experience} onChange={(e) => setBusinessForm({ ...businessForm, experience: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Ex: Nutricionista há 5 anos..." /></div>
        <div><label className="block text-gray-300 mb-2 font-medium">Principais concorrentes</label><textarea value={businessForm.competitors} onChange={(e) => setBusinessForm({ ...businessForm, competitors: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Ex: Nutricionistas generalistas..." /></div>
        <div><label className="block text-gray-300 mb-2 font-medium">Seus diferenciais competitivos</label><textarea value={businessForm.differentials} onChange={(e) => setBusinessForm({ ...businessForm, differentials: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Ex: Metodologia própria testada..." /></div>
        <button onClick={generateBusinessPlan} disabled={loading || !businessForm.business} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">{loading ? 'Gerando Plano Profissional...' : 'Gerar Plano de Negócios Completo'}</button>
      </div>
      {result && !result.error && activeTab === 'planner' && (
        <div id="result-content" className="space-y-4">
          <div className="flex justify-end"><button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors"><Download className="w-5 h-5" />Exportar PDF</button></div>
          <div>
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/50 rounded-lg p-6"><h3 className="text-xl font-bold text-white mb-3">Resumo Executivo</h3><p className="text-gray-200 leading-relaxed">{result.resumo_executivo}</p></div>
            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4"><h3 className="text-xl font-bold text-white mb-4">Análise de Mercado</h3><div className="space-y-3"><div><h4 className="text-purple-400 font-semibold mb-1">+ Tamanho do Mercado</h4><p className="text-gray-300">{result.analise_mercado?.tamanho_mercado}</p></div><div><h4 className="text-purple-400 font-semibold mb-1">+ Público-Alvo</h4><p className="text-gray-300">{result.analise_mercado?.publico_alvo}</p></div><div><h4 className="text-purple-400 font-semibold mb-1">+ Tendências</h4><p className="text-gray-300">{result.analise_mercado?.tendencias}</p></div></div></div>
            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4"><h3 className="text-xl font-bold text-white mb-4">Estrutura de Custos</h3><div className="space-y-4"><div><h4 className="text-purple-400 font-semibold mb-2">Investimento Inicial</h4><ul className="space-y-1">{result.estrutura_custos?.investimento_inicial.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400">•</span><span>{item}</span></li>))}</ul></div><div><h4 className="text-purple-400 font-semibold mb-2">Custos Fixos Mensais</h4><ul className="space-y-1">{result.estrutura_custos?.custos_fixos_mensais.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400">•</span><span>{item}</span></li>))}</ul></div><div><h4 className="text-purple-400 font-semibold mb-2">Custos Variáveis</h4><ul className="space-y-1">{result.estrutura_custos?.custos_variaveis.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400">•</span><span>{item}</span></li>))}</ul></div></div></div>
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 mt-4"><h3 className="text-xl font-bold text-white mb-4">Estratégia de Receita</h3><div className="space-y-3"><div><h4 className="text-green-400 font-semibold mb-1">+ Precificação</h4><p className="text-gray-300">{result.estrategia_receita?.precificacao}</p></div><div><h4 className="text-green-400 font-semibold mb-1">+ Projeção Mensal</h4><p className="text-gray-300">{result.estrategia_receita?.projecao_mensal}</p></div></div></div>
            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4"><h3 className="text-xl font-bold text-white mb-4">Vantagens Competitivas</h3><ul className="space-y-2">{result.vantagens_competitivas?.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-green-400">+</span><span>{item}</span></li>))}</ul></div>
            <div className="bg-gray-900 border border-yellow-500/30 rounded-lg p-6 mt-4"><h3 className="text-xl font-bold text-white mb-4">Análise de Riscos</h3><div className="space-y-3">{result.analise_riscos?.map((item, idx) => (<div key={idx} className="bg-black border border-gray-800 rounded p-3"><h4 className="text-yellow-400 font-semibold mb-1">- Risco: {item.risco}</h4><p className="text-gray-300"><span className="text-green-400">Mitigação:</span> {item.mitigacao}</p></div>))}</div></div>
            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4"><h3 className="text-xl font-bold text-white mb-4">Roadmap 90 Dias</h3><div className="space-y-4"><div><h4 className="text-purple-400 font-bold mb-2">Mês 1</h4><ul className="space-y-1">{result.roadmap_90dias?.mes1.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400">•</span><span>{item}</span></li>))}</ul></div><div><h4 className="text-purple-400 font-bold mb-2">Mês 2</h4><ul className="space-y-1">{result.roadmap_90dias?.mes2.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400">•</span><span>{item}</span></li>))}</ul></div><div><h4 className="text-purple-400 font-bold mb-2">Mês 3</h4><ul className="space-y-1">{result.roadmap_90dias?.mes3.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400">•</span><span>{item}</span></li>))}</ul></div></div></div>
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 mt-4"><h3 className="text-xl font-bold text-white mb-4">KPIs e Métricas de Sucesso</h3><ul className="space-y-2">{result.kpis?.map((item, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-green-400">•</span><span>{item}</span></li>))}</ul></div>
          </div>
        </div>
      )}
      {result && result.error && (<div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">{result.message}</div>)}
    </div>
  );

  const renderMarketing = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><TrendingUp className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold text-white">Estratégia de Marketing</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div><label className="block text-gray-300 mb-2 font-medium">Produto ou serviço</label><textarea value={marketingForm.product} onChange={(e) => setMarketingForm({ ...marketingForm, product: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="3" placeholder="Ex: Curso online de fotografia..." /></div>
        <div><label className="block text-gray-300 mb-2 font-medium">Público-alvo</label><input type="text" value={marketingForm.audience} onChange={(e) => setMarketingForm({ ...marketingForm, audience: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Jovens entre 18-30 anos..." /></div>
        <div><label className="block text-gray-300 mb-2 font-medium">Orçamento mensal para marketing</label><input type="text" value={marketingForm.budget} onChange={(e) => setMarketingForm({ ...marketingForm, budget: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: R$ 500 ou Zero" /></div>
        <button onClick={generateMarketingStrategy} disabled={loading || !marketingForm.product} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">{loading ? 'Gerando Estratégia...' : 'Gerar Estratégia de Marketing'}</button>
      </div>
      {result && !result.error && activeTab === 'marketing' && (
        <div id="result-content" className="space-y-4">
          <div className="flex justify-end"><button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors"><Download className="w-5 h-5" />Exportar PDF</button></div>
          <div className="space-y-4">
            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-6">
              <h3 className="text-2xl font-bold text-white">Sua Estratégia de Marketing</h3>
              <div className="space-y-4">
                <div><h4 className="text-lg font-semibold text-purple-400 mb-2">Canais Prioritários</h4><ul className="space-y-2">{result.canais_prioritarios?.map((canal, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-green-400">•</span><span>{canal}</span></li>))}</ul></div>
                <div><h4 className="text-lg font-semibold text-purple-400 mb-2">Primeiras Ações</h4><ol className="space-y-2">{result.primeiras_acoes?.map((acao, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-purple-400 font-bold">{idx + 1}.</span><span>{acao}</span></li>))}</ol></div>
                <div><h4 className="text-lg font-semibold text-purple-400 mb-2">Calendário 30 Dias</h4><div className="space-y-2">{result.calendario_30dias?.map((semana, idx) => (<div key={idx} className="bg-black border border-gray-800 rounded p-3"><p className="text-gray-300">{semana}</p></div>))}</div></div>
                <div><h4 className="text-lg font-semibold text-purple-400 mb-2">Métricas para Acompanhar</h4><ul className="space-y-2">{result.metricas_acompanhar?.map((metrica, idx) => (<li key={idx} className="text-gray-300 flex items-start gap-2"><span className="text-green-400">•</span><span>{metrica}</span></li>))}</ul></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {result && result.error && (<div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400">{result.message}</div>)}
    </div>
  );

  const renderDiagnostic = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><Zap className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold text-white">Diagnóstico Rápido</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <input type="text" value={diagnosticForm.businessName} onChange={(e) => setDiagnosticForm({ ...diagnosticForm, businessName: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Nome do seu negócio" />
        <select value={diagnosticForm.stage} onChange={(e) => setDiagnosticForm({ ...diagnosticForm, stage: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3"><option value="">Estágio do negócio...</option><option>Ideia</option><option>MVP</option><option>Tração</option><option>Crescimento</option></select>
        <input type="text" value={diagnosticForm.monthlyRevenue} onChange={(e) => setDiagnosticForm({ ...diagnosticForm, monthlyRevenue: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Faturamento mensal (Ex: R$ 10.000)" />
        <input type="number" value={diagnosticForm.teamSize} onChange={(e) => setDiagnosticForm({ ...diagnosticForm, teamSize: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Tamanho da equipe" />
        <textarea value={diagnosticForm.mainChallenge} onChange={(e) => setDiagnosticForm({ ...diagnosticForm, mainChallenge: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="2" placeholder="Seu principal desafio atual..." />
        <button onClick={generateDiagnostic} disabled={loading || !diagnosticForm.businessName} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 font-bold py-3 rounded">{loading ? 'Analisando...' : 'Gerar Diagnóstico'}</button>
      </div>
      {result && !result.error && activeTab === 'diagnostic' && (
        <div id="result-content" className="bg-gray-900 border border-purple-400/30 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Diagnóstico</h3>
            <div className="text-right"><div className="text-3xl font-bold text-purple-400">{result.overallScore}/100</div></div>
          </div>
          {result.frase_impacto && <p className="italic text-purple-100 p-3 bg-purple-900/30 rounded">"{result.frase_impacto}"</p>}
          <div><h4 className="font-semibold text-green-400">Forças</h4><ul className="list-disc pl-5">{result.strengths?.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
          <div><h4 className="font-semibold text-yellow-400">Fraquezas</h4><ul className="list-disc pl-5">{result.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}</ul></div>
          <div><h4 className="font-semibold text-red-400">Prioridades</h4><ol className="list-decimal pl-5">{result.priorities?.map((p, i) => <li key={i}>{p}</li>)}</ol></div>
        </div>
      )}
      {result?.error && <div className="bg-red-900/20 p-4 rounded">{result.message}</div>}
    </div>
  );

  const renderPitch = () => (
    <div className="max-w-
3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><Mic className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold text-white">Pitch de Elevador</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <input type="text" value={pitchForm.businessName} onChange={(e) => setPitchForm({ ...pitchForm, businessName: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Nome do seu negócio" />
        <textarea value={pitchForm.problemStatement} onChange={(e) => setPitchForm({ ...pitchForm, problemStatement: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="2" placeholder="Problema que você resolve..." />
        <textarea value={pitchForm.solution} onChange={(e) => setPitchForm({ ...pitchForm, solution: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="2" placeholder="Sua solução..." />
<textarea value={pitchForm.differentiator} onChange={(e) => setPitchForm({ ...pitchForm, differentiator: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="2" placeholder="Seu diferencial..." />
        <button onClick={generateElevatorPitch} disabled={loading || !pitchForm.businessName} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 font-bold py-3 rounded">{loading ? 'Gerando Pitches...' : 'Gerar Pitch de Elevador'}</button>
      </div>
      {result && !result.error && activeTab === 'pitch' && (
        <div id="result-content" className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
          {result.pitch30 && <div><h4 className="font-semibold text-blue-400">Pitch 30 Segundos</h4><p className="italic p-2 bg-gray-800 rounded">"{result.pitch30}"</p></div>}
          {result.pitch60 && <div><h4 className="font-semibold text-green-400">Pitch 60 Segundos</h4><p className="italic p-2 bg-gray-800 rounded">"{result.pitch60}"</p></div>}
          {result.pitch120 && <div><h4 className="font-semibold text-purple-400">Pitch 2 Minutos</h4><p className="italic p-2 bg-gray-800 rounded">"{result.pitch120}"</p></div>}
          {result.tips && <div><h4 className="font-semibold text-yellow-400">Dicas</h4><ul className="list-disc pl-5">{result.tips.map((t, i) => <li key={i}>{t}</li>)}</ul></div>}
        </div>
      )}
      {result?.error && <div className="bg-red-900/20 p-4 rounded">{result.message}</div>}
    </div>
  );

  // --- ESTRUTURA PRINCIPAL DO COMPONENTE ---
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 border-b border-purple-500/30 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('home'); setResult(null); }}>
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-xl font-bold">MentorIA</span>
            </div>

            <div className="hidden md:flex space-x-1">
              <button onClick={() => { setActiveTab('home'); setResult(null); }} className={`px-3 py-2 rounded transition-colors ${activeTab === 'home' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Início</button>
              <button onClick={() => { setActiveTab('validator'); setResult(null); }} className={`px-3 py-2 rounded transition-colors ${activeTab === 'validator' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Validador</button>
              <button onClick={() => { setActiveTab('diagnostic'); setResult(null); }} className={`px-3 py-2 rounded transition-colors ${activeTab === 'diagnostic' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Diagnóstico</button>
              <button onClick={() => { setActiveTab('planner'); setResult(null); }} className={`px-3 py-2 rounded transition-colors ${activeTab === 'planner' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Plano</button>
              <button onClick={() => { setActiveTab('marketing'); setResult(null); }} className={`px-3 py-2 rounded transition-colors ${activeTab === 'marketing' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Marketing</button>
              <button onClick={() => { setActiveTab('pitch'); setResult(null); }} className={`px-3 py-2 rounded transition-colors ${activeTab === 'pitch' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Pitch</button>
              <button onClick={() => { setActiveTab('pricing'); setResult(null); }} className={`px-3 py-2 rounded transition-colors ${activeTab === 'pricing' ? 'bg-green-600' : 'hover:bg-gray-800'}`}>Preços</button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-2 space-y-1">
              <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); setResult(null); }} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800">Início</button>
              <button onClick={() => { setActiveTab('validator'); setMobileMenuOpen(false); setResult(null); }} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800">Validador de Ideias</button>
              <button onClick={() => { setActiveTab('diagnostic'); setMobileMenuOpen(false); setResult(null); }} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800">Diagnóstico Rápido</button>
              <button onClick={() => { setActiveTab('planner'); setMobileMenuOpen(false); setResult(null); }} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800">Plano de Negócios</button>
              <button onClick={() => { setActiveTab('marketing'); setMobileMenuOpen(false); setResult(null); }} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800">Estratégia de Marketing</button>
              <button onClick={() => { setActiveTab('pitch'); setMobileMenuOpen(false); setResult(null); }} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800">Pitch de Elevador</button>
              <button onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); setResult(null); }} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800">Calculadora de Preços</button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'validator' && renderValidator()}
        {activeTab === 'diagnostic' && renderDiagnostic()}
        {activeTab === 'pricing' && renderPricing()}
        {activeTab === 'planner' && renderPlanner()}
        {activeTab === 'marketing' && renderMarketing()}
        {activeTab === 'pitch' && renderPitch()}
      </main>

      <footer className="bg-gray-900 border-t border-purple-500/30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>MentorIA - Seu mentor de negócios com inteligência artificial</p>
        </div>
      </footer>
    </div>
  );
};

export default MentorIA;
