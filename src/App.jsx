import React, { useState } from 'react';
import { Lightbulb, FileText, TrendingUp, Menu, X, Sparkles, CheckCircle, AlertCircle, Download, Zap, DollarSign, Mic } from 'lucide-react';

const GROQ_API_KEY=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


const MentorIA = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const [ideaForm, setIdeaForm] = useState({
    idea: '',
    target: '',
    problem: ''
  });
  
  const [diagnosticForm, setDiagnosticForm] = useState({
    businessName: '',
    stage: '',
    monthlyRevenue: '',
    teamSize: '',
    mainChallenge: '',
    marketPosition: '',
    customerSatisfaction: '',
    operationalMaturity: '',
    financialHealth: '',
    growthRate: ''
  });
  
  const [pricingForm, setPricingForm] = useState({
    productName: '',
    productCost: '',
    desiredMargin: '',
    competitorPrice: '',
    targetMarket: ''
  });
  
  const [businessForm, setBusinessForm] = useState({
    business: '',
    market: '',
    investment: '',
    timeline: '',
    experience: '',
    competitors: '',
    differentials: ''
  });
  
  const [marketingForm, setMarketingForm] = useState({
    product: '',
    audience: '',
    budget: ''
  });

  const [pitchForm, setPitchForm] = useState({
    businessName: '',
    problemStatement: '',
    solution: '',
    targetAudience: '',
    differentiator: '',
    callToAction: ''
  });

  // ============= VALIDADOR DE IDEIAS =============
  const analyzeIdea = async () => {
    setLoading(true);
    setResult(null);
    
    try {
    const response = await fetch('http://localhost:3001/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
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

Retorne APENAS este JSON válido (sem markdown, sem texto adicional):
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
      
      const text = data.choices[0].message.content;
      const cleanText = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      setResult(parsed);
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
    }
    
    setLoading(false);
  };

  // ============= DIAGNÓSTICO RÁPIDO =============
  const generateDiagnostic = async () => {
    setLoading(true);
    setResult(null);
    
    try {const response = await fetch('http://localhost:3001/api/mentor', {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'system',
            content: 'Você é um consultor de negócios elite. Retorne JSON válido.'
          }, {
            role: 'user',
            content: `Faça um diagnóstico profundo do negócio como faria um consultor estratégico global que cobra R$ 50 mil por hora. Use linguagem simples, clara e realista. Traga números e estimativas sempre que possível, com foco em ROI, execução e priorização. Dê exemplos práticos.

NEGÓCIO: ${diagnosticForm.businessName}
ESTÁGIO: ${diagnosticForm.stage}
RECEITA MENSAL: ${diagnosticForm.monthlyRevenue}
TAMANHO DO TIME: ${diagnosticForm.teamSize}
PRINCIPAL DESAFIO: ${diagnosticForm.mainChallenge}
POSIÇÃO NO MERCADO: ${diagnosticForm.marketPosition}
SATISFAÇÃO DO CLIENTE: ${diagnosticForm.customerSatisfaction}
MATURIDADE OPERACIONAL: ${diagnosticForm.operationalMaturity}
SAÚDE FINANCEIRA: ${diagnosticForm.financialHealth}
TAXA DE CRESCIMENTO: ${diagnosticForm.growthRate}

Retorne APENAS este JSON:
{
  "overallScore": 75,
  "frase_impacto": "Uma frase curta e direta que captura a essência estratégica deste negócio",
  "strengths": ["força 1", "força 2", "força 3"],
  "weaknesses": ["fraqueza 1", "fraqueza 2"],
  "priorities": ["prioridade 1", "prioridade 2", "prioridade 3"],
  "recommendations": ["recomendação 1", "recomendação 2"],
  "nextTool": "nome da ferramenta recomendada"
}`
          }],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      
      const text = data.choices[0].message.content;
      const cleanText = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      setResult(parsed);
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
    }
    
    setLoading(false);
  };

  // ============= CALCULADORA DE PRECIFICAÇÃO =============
  const calculatePricing = async () => {
    setLoading(true);
    setResult(null);
    
    try {
  const response = await fetch('http://localhost:3001/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'system',
            content: 'Você é um especialista em precificação e estratégia de preços. Retorne JSON válido.'
          }, {
            role: 'user',
            content: `Calcule a estratégia de precificação ideal como faria um especialista que cobra R$ 50 mil por hora. Use análise de custos, margens, posicionamento e psicologia de preços.

PRODUTO: ${pricingForm.productName}
CUSTO: R$ ${pricingForm.productCost}
MARGEM DESEJADA: ${pricingForm.desiredMargin}%
PREÇO CONCORRENTE: R$ ${pricingForm.competitorPrice}
MERCADO-ALVO: ${pricingForm.targetMarket}

Retorne APENAS este JSON:
{
  "minPrice": 100,
  "idealPrice": 150,
  "premiumPrice": 200,
  "minMargin": 50,
  "idealMargin": 75,
  "premiumMargin": 100,
  "breakEvenPoint": 500,
  "positioning": "descrição do posicionamento",
  "recommendation": "recomendação estratégica",
  "psychologyTips": ["dica 1", "dica 2"]
}`
          }],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      
      const text = data.choices[0].message.content;
      const cleanText = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      setResult(parsed);
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
    }
    
    setLoading(false);
  };

  // ============= PLANO DE NEGÓCIOS =============
  const generateBusinessPlan = async () => {
    setLoading(true);
    setResult(null);
    
    try {
 const response = await fetch('http://localhost:3001/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
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

Retorne APENAS este JSON válido (sem markdown, sem explicações extras):
{
  "frase_impacto": "Uma frase curta e direta que captura a essência estratégica deste negócio (estilo Simon Sinek ou Peter Thiel)",
  "resumo_executivo": "Resumo em 2-3 frases com clareza e impacto.",
  "analise_mercado": {
    "tamanho_mercado": "Tamanho estimado com números ou percentuais.",
    "publico_alvo": "Descrição objetiva do público.",
    "tendencias": "Tendências atuais que influenciam o setor."
  },
  "estrutura_custos": {
    "investimento_inicial": ["Item 1: R$ valor", "Item 2: R$ valor"],
    "custos_fixos_mensais": ["Custo 1: R$ valor/mês", "Custo 2: R$ valor/mês"],
    "custos_variaveis": ["Item 1 variável", "Item 2 variável"]
  },
  "estrategia_receita": {
    "fontes_receita": ["Fonte 1", "Fonte 2"],
    "precificacao": "Estratégia direta de precificação.",
    "projecao_mensal": "Projeção realista mês a mês."
  },
  "vantagens_competitivas": ["Diferencial 1", "Diferencial 2", "Diferencial 3"],
  "analise_riscos": [
    {"risco": "Risco relevante", "mitigacao": "Ação prática"},
    {"risco": "Outro risco", "mitigacao": "Solução concreta"}
  ],
  "roadmap_90dias": {
    "mes1": ["Ação 1", "Ação 2"],
    "mes2": ["Ação 1", "Ação 2"],
    "mes3": ["Ação 1", "Ação 2"]
  },
  "kpis": ["KPI 1 com meta numérica", "KPI 2 com indicador claro"]
}`
          }],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      
      const text = data.choices[0].message.content;
      const cleanText = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      setResult(parsed);
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
    }
    
    setLoading(false);
  };

  // ============= ESTRATÉGIA DE MARKETING =============
  const generateMarketingStrategy = async () => {
    setLoading(true);
    setResult(null);
    
    try {
const response = await fetch('http://localhost:3001/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
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

Retorne APENAS este JSON válido (sem markdown, sem texto adicional):
{
  "frase_impacto": "Uma frase curta e direta que captura a essência desta estratégia (estilo Seth Godin ou Gary Vee)",
  "canais_prioritarios": ["Canal 1 com explicação objetiva", "Canal 2", "Canal 3"],
  "primeiras_acoes": ["Ação inicial prática 1", "Ação 2 específica", "Ação 3 rápida"],
  "calendario_30dias": [
    "Semana 1: ações claras",
    "Semana 2: execução e ajustes",
    "Semana 3: otimização",
    "Semana 4: consolidação de resultados"
  ],
  "metricas_acompanhar": ["Métrica 1 com meta numérica", "Métrica 2 com resultado esperado"],
  "budget_allocation": "Como alocar o orçamento entre canais"
}`
          }],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      
      const text = data.choices[0].message.content;
      const cleanText = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      setResult(parsed);
    } catch (error) {
      console.error('Erro:', error);
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
    }
    
    setLoading(false);
  };

  // ============= PITCH DE ELEVADOR =============
  const generateElevatorPitch = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'system',
            content: 'Você é um especialista em pitch de elevador e comunicação de negócios. Retorne JSON válido.'
          }, {
            role: 'user',
            content: `Crie pitches de elevador profissionais e impactantes para diferentes contextos. Use linguagem persuasiva, clara e memorável. Cada pitch deve ter estrutura clara: problema, solução, diferencial, chamada à ação.

NEGÓCIO: ${pitchForm.businessName}
PROBLEMA: ${pitchForm.problemStatement}
SOLUÇÃO: ${pitchForm.solution}
PÚBLICO-ALVO: ${pitchForm.targetAudience}
DIFERENCIAL: ${pitchForm.differentiator}
CHAMADA À AÇÃO: ${pitchForm.callToAction}

Retorne APENAS este JSON:
{
  "pitch30": "Pitch de 30 segundos (máximo impacto para networking)",
  "pitch60": "Pitch de 60 segundos (ideal para eventos e reuniões)",
  "pitch120": "Pitch de 2 minutos (apresentações formais e investidores)",
  "tips": ["dica 1 de apresentação", "dica 2 de tom", "dica 3 de timing"],
  "keywords": ["palavra-chave 1", "palavra-chave 2", "palavra-chave 3"]
}`
          }],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error('Resposta inválida');
      
      const text = data.choices[0].message.content;
      const cleanText = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      setResult(parsed);
    } catch (error) {
      console.error('Erro:', error);
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
    printWindow.document.write('<div class="footer">Gerado por MentorIA - Seu Mentor de Negócios com IA</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
  };

  const renderHome = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Sparkles className="w-16 h-16 text-purple-500" />
        </div>
        <h1 className="text-4xl font-bold text-white">MentorIA</h1>
        <p className="text-xl text-gray-300">Seu mentor de negócios com inteligência artificial</p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Valide ideias, crie planos de negócio, calcule precificação, faça diagnósticos, desenvolva estratégias de marketing e gere pitches impactantes com ajuda de IA avançada.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div onClick={() => setActiveTab('validator')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all cursor-pointer group">
          <Lightbulb className="w-12 h-12 text-purple-500 mb-4 group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2">Validador de Ideias</h3>
          <p className="text-gray-400">Analise a viabilidade da sua ideia de negócio em minutos</p>
        </div>

        <div onClick={() => setActiveTab('diagnostic')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all cursor-pointer group">
          <Zap className="w-12 h-12 text-purple-500 mb-4 group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2">Diagnóstico Rápido</h3>
          <p className="text-gray-400">Avalie o estágio atual do seu negócio em detalhes</p>
        </div>

        <div onClick={() => setActiveTab('pricing')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all cursor-pointer group">
          <DollarSign className="w-12 h-12 text-purple-500 mb-4 group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2">Calculadora de Preços</h3>
          <p className="text-gray-400">Calcule o preço ideal para seu produto ou serviço</p>
        </div>

        <div onClick={() => setActiveTab('planner')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all cursor-pointer group">
          <FileText className="w-12 h-12 text-purple-500 mb-4 group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2">Plano de Negócios</h3>
          <p className="text-gray-400">Gere um plano de negócios estruturado e acionável</p>
        </div>

        <div onClick={() => setActiveTab('marketing')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all cursor-pointer group">
          <TrendingUp className="w-12 h-12 text-purple-500 mb-4 group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2">Estratégia de Marketing</h3>
          <p className="text-gray-400">Crie um plano de marketing completo para seus primeiros 30 dias</p>
        </div>

        <div onClick={() => setActiveTab('pitch')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all cursor-pointer group">
          <Mic className="w-12 h-12 text-purple-500 mb-4 group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2">Pitch de Elevador</h3>
          <p className="text-gray-400">Gere discursos de venda em 30s, 1min e 2min</p>
        </div>
      </div>
    </div>
  );

  const renderValidator = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-white">Validador de Ideias</h2>
      </div>

      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Descreva sua ideia de negócio</label>
          <textarea value={ideaForm.idea} onChange={(e) => setIdeaForm({...ideaForm, idea: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="4" placeholder="Ex: Aplicativo de delivery de comida saudável focado em atletas..." />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Quem é seu público-alvo?</label>
          <input type="text" value={ideaForm.target} onChange={(e) => setIdeaForm({...ideaForm, target: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Atletas amadores entre 25-40 anos..." />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Que problema você resolve?</label>
          <input type="text" value={ideaForm.problem} onChange={(e) => setIdeaForm({...ideaForm, problem: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Dificuldade em encontrar refeições balanceadas e práticas..." />
        </div>

        <button onClick={analyzeIdea} disabled={loading || !ideaForm.idea || !ideaForm.target || !ideaForm.problem} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Analisando...' : 'Analisar Ideia'}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>

          <div id="result-content" className="space-y-4">
            {result.frase_impacto && (
              <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border border-green-500/50 rounded-lg p-4 text-center">
                <p className="text-lg italic text-green-100 font-semibold">"{result.frase_impacto}"</p>
              </div>
            )}

            <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Análise Completa</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">{result.score}/100</div>
                  <div className="text-sm text-gray-400 uppercase">{result.viabilidade}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Pontos Fortes
                  </h4>
                  <ul className="space-y-2">
                    {result.pontos_fortes && result.pontos_fortes.map((ponto, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Pontos de Atenção
                  </h4>
                  <ul className="space-y-2">
                    {result.pontos_atencao && result.pontos_atencao.map((ponto, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Próximos Passos</h4>
                  <ol className="space-y-2">
                    {result.proximos_passos && result.proximos_passos.map((passo, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 font-bold">{idx + 1}.</span>
                        <span>{passo}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
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

  const renderDiagnostic = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-white">Diagnóstico Rápido do Negócio</h2>
      </div>

      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Nome do Negócio</label>
          <input type="text" value={diagnosticForm.businessName} onChange={(e) => setDiagnosticForm({...diagnosticForm, businessName: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Seu negócio" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Estágio do Negócio</label>
          <select value={diagnosticForm.stage} onChange={(e) => setDiagnosticForm({...diagnosticForm, stage: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none">
            <option value="">Selecione...</option>
            <option value="Ideia">Ideia</option>
            <option value="MVP">MVP</option>
            <option value="Tração Inicial">Tração Inicial</option>
            <option value="Crescimento">Crescimento</option>
            <option value="Maduro">Maduro</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Receita Mensal</label>
            <input type="text" value={diagnosticForm.monthlyRevenue} onChange={(e) => setDiagnosticForm({...diagnosticForm, monthlyRevenue: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: R$ 50.000" />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Tamanho do Time</label>
            <input type="number" value={diagnosticForm.teamSize} onChange={(e) => setDiagnosticForm({...diagnosticForm, teamSize: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Número de pessoas" />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Principal Desafio</label>
          <textarea value={diagnosticForm.mainChallenge} onChange={(e) => setDiagnosticForm({...diagnosticForm, mainChallenge: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Qual é seu maior desafio?" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Posição no Mercado</label>
          <select value={diagnosticForm.marketPosition} onChange={(e) => setDiagnosticForm({...diagnosticForm, marketPosition: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none">
            <option value="">Selecione...</option>
            <option value="Líder">Líder</option>
            <option value="Competidor Forte">Competidor Forte</option>
            <option value="Nicho">Nicho</option>
            <option value="Entrante">Entrante</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Satisfação do Cliente (1-10)</label>
            <input type="number" min="1" max="10" value={diagnosticForm.customerSatisfaction} onChange={(e) => setDiagnosticForm({...diagnosticForm, customerSatisfaction: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Maturidade Operacional (1-10)</label>
            <input type="number" min="1" max="10" value={diagnosticForm.operationalMaturity} onChange={(e) => setDiagnosticForm({...diagnosticForm, operationalMaturity: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Saúde Financeira (1-10)</label>
            <input type="number" min="1" max="10" value={diagnosticForm.financialHealth} onChange={(e) => setDiagnosticForm({...diagnosticForm, financialHealth: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Taxa de Crescimento Mensal (%)</label>
          <input type="number" value={diagnosticForm.growthRate} onChange={(e) => setDiagnosticForm({...diagnosticForm, growthRate: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: 5" />
        </div>

        <button onClick={generateDiagnostic} disabled={loading || !diagnosticForm.businessName} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Gerando Diagnóstico...' : 'Gerar Diagnóstico'}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>

          <div id="result-content" className="space-y-4">
            {result.frase_impacto && (
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/50 rounded-lg p-4 text-center">
                <p className="text-lg italic text-purple-100 font-semibold">"{result.frase_impacto}"</p>
              </div>
            )}

            <div className="bg-gray-900 border border-purple-400/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Score Geral</h3>
                <div className="text-3xl font-bold text-purple-400">{result.overallScore}/100</div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">Forças</h4>
                <ul className="space-y-2">
                  {result.strengths && result.strengths.map((s, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Fraquezas</h4>
                <ul className="space-y-2">
                  {result.weaknesses && result.weaknesses.map((w, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">⚠</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-2">Prioridades</h4>
                <ol className="space-y-2">
                  {result.priorities && result.priorities.map((p, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-red-400 font-bold">{i + 1}.</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Recomendações</h4>
                <ul className="space-y-2">
                  {result.recommendations && result.recommendations.map((r, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
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

  const renderPricing = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-white">Calculadora de Precificação</h2>
      </div>

      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Nome do Produto</label>
          <input type="text" value={pricingForm.productName} onChange={(e) => setPricingForm({...pricingForm, productName: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Curso Online" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Custo do Produto (R$)</label>
            <input type="number" value={pricingForm.productCost} onChange={(e) => setPricingForm({...pricingForm, productCost: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: 50" />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Margem Desejada (%)</label>
            <input type="number" value={pricingForm.desiredMargin} onChange={(e) => setPricingForm({...pricingForm, desiredMargin: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: 50" />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Preço do Concorrente (R$)</label>
          <input type="number" value={pricingForm.competitorPrice} onChange={(e) => setPricingForm({...pricingForm, competitorPrice: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: 150" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Mercado-alvo</label>
          <input type="text" value={pricingForm.targetMarket} onChange={(e) => setPricingForm({...pricingForm, targetMarket: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Profissionais de Tech" />
        </div>

        <button onClick={calculatePricing} disabled={loading || !pricingForm.productName} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Calculando...' : 'Calcular Preço Ideal'}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>

          <div id="result-content" className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-4 text-center">
              <h4 className="text-gray-300 mb-2">Preço Mínimo</h4>
              <p className="text-2xl font-bold text-blue-400">R$ {result.minPrice?.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Margem: {result.minMargin}%</p>
            </div>

            <div className="bg-gray-900 border border-green-400/30 rounded-lg p-4 text-center">
              <h4 className="text-gray-300 mb-2">Preço Ideal</h4>
              <p className="text-2xl font-bold text-green-400">R$ {result.idealPrice?.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Margem: {result.idealMargin}%</p>
            </div>

            <div className="bg-gray-900 border border-purple-400/30 rounded-lg p-4 text-center">
              <h4 className="text-gray-300 mb-2">Preço Premium</h4>
              <p className="text-2xl font-bold text-purple-400">R$ {result.premiumPrice?.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Margem: {result.premiumMargin}%</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-purple-400/30 rounded-lg p-6 space-y-4">
            {result.positioning && (
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Posicionamento</h4>
                <p className="text-gray-300">{result.positioning}</p>
              </div>
            )}

            {result.recommendation && (
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">Recomendação Estratégica</h4>
                <p className="text-gray-300">{result.recommendation}</p>
              </div>
            )}

            {result.psychologyTips && (
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Dicas de Psicologia de Preços</h4>
                <ul className="space-y-2">
                  {result.psychologyTips.map((tip, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
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

  const renderPlanner = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-white">Gerador de Plano de Negócios Profissional</h2>
      </div>

      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Descreva seu negócio em detalhes</label>
          <textarea value={businessForm.business} onChange={(e) => setBusinessForm({...businessForm, business: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="4" placeholder="Ex: Consultoria online de nutrição esportiva..." />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Análise de mercado</label>
          <textarea value={businessForm.market} onChange={(e) => setBusinessForm({...businessForm, market: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="3" placeholder="Ex: Mercado cresceu 30% nos últimos 2 anos..." />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Investimento disponível</label>
            <input type="text" value={businessForm.investment} onChange={(e) => setBusinessForm({...businessForm, investment: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: R$ 5.000" />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Prazo para lançamento</label>
            <input type="text" value={businessForm.timeline} onChange={(e) => setBusinessForm({...businessForm, timeline: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: 60 dias" />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Sua experiência na área</label>
          <textarea value={businessForm.experience} onChange={(e) => setBusinessForm({...businessForm, experience: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Ex: Nutricionista há 5 anos..." />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Principais concorrentes</label>
          <textarea value={businessForm.competitors} onChange={(e) => setBusinessForm({...businessForm, competitors: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Ex: Nutricionistas generalistas..." />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Seus diferenciais competitivos</label>
          <textarea value={businessForm.differentials} onChange={(e) => setBusinessForm({...businessForm, differentials: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Ex: Metodologia própria testada..." />
        </div>

        <button onClick={generateBusinessPlan} disabled={loading || !businessForm.business || !businessForm.market || !businessForm.investment || !businessForm.timeline || !businessForm.experience || !businessForm.competitors || !businessForm.differentials} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Gerando Plano Profissional...' : 'Gerar Plano de Negócios Completo'}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>

          <div id="result-content" className="space-y-4">
            {result.frase_impacto && (
              <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border border-green-500/50 rounded-lg p-4 text-center">
                <p className="text-lg italic text-green-100 font-semibold">"{result.frase_impacto}"</p>
              </div>
            )}

            {result.resumo_executivo && (
              <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Resumo Executivo</h4>
                <p className="text-gray-300">{result.resumo_executivo}</p>
              </div>
            )}

            {result.analise_mercado && (
              <div className="bg-gray-900 border border-purple-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-4">Análise de Mercado</h4>
                <div className="space-y-3">
                  {result.analise_mercado.tamanho_mercado && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-1">Tamanho do Mercado</h5>
                      <p className="text-gray-400">{result.analise_mercado.tamanho_mercado}</p>
                    </div>
                  )}
                  {result.analise_mercado.publico_alvo && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-1">Público-alvo</h5>
                      <p className="text-gray-400">{result.analise_mercado.publico_alvo}</p>
                    </div>
                  )}
                  {result.analise_mercado.tendencias && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-1">Tendências</h5>
                      <p className="text-gray-400">{result.analise_mercado.tendencias}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.estrutura_custos && (
              <div className="bg-gray-900 border border-red-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-400 mb-4">Estrutura de Custos</h4>
                <div className="space-y-3">
                  {result.estrutura_custos.investimento_inicial && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-2">Investimento Inicial</h5>
                      <ul className="space-y-1">
                        {result.estrutura_custos.investimento_inicial.map((item, i) => (
                          <li key={i} className="text-gray-400 flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.estrutura_custos.custos_fixos_mensais && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-2">Custos Fixos Mensais</h5>
                      <ul className="space-y-1">
                        {result.estrutura_custos.custos_fixos_mensais.map((item, i) => (
                          <li key={i} className="text-gray-400 flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.estrategia_receita && (
              <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-4">Estratégia de Receita</h4>
                <div className="space-y-3">
                  {result.estrategia_receita.fontes_receita && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-2">Fontes de Receita</h5>
                      <ul className="space-y-1">
                        {result.estrategia_receita.fontes_receita.map((item, i) => (
                          <li key={i} className="text-gray-400 flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.estrategia_receita.precificacao && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-1">Precificação</h5>
                      <p className="text-gray-400">{result.estrategia_receita.precificacao}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.vantagens_competitivas && (
              <div className="bg-gray-900 border border-yellow-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Vantagens Competitivas</h4>
                <ul className="space-y-2">
                  {result.vantagens_competitivas.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.analise_riscos && (
              <div className="bg-gray-900 border border-orange-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-orange-400 mb-4">Análise de Riscos</h4>
                <div className="space-y-3">
                  {result.analise_riscos.map((item, i) => (
                    <div key={i} className="border-l-2 border-orange-400 pl-4">
                      <h5 className="text-gray-300 font-medium">{item.risco}</h5>
                      <p className="text-gray-400 text-sm mt-1">Mitigação: {item.mitigacao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.roadmap_90dias && (
              <div className="bg-gray-900 border border-cyan-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Roadmap 90 Dias</h4>
                <div className="space-y-3">
                  {result.roadmap_90dias.mes1 && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-2">Mês 1</h5>
                      <ul className="space-y-1">
                        {result.roadmap_90dias.mes1.map((item, i) => (
                          <li key={i} className="text-gray-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.roadmap_90dias.mes2 && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-2">Mês 2</h5>
                      <ul className="space-y-1">
                        {result.roadmap_90dias.mes2.map((item, i) => (
                          <li key={i} className="text-gray-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.roadmap_90dias.mes3 && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-2">Mês 3</h5>
                      <ul className="space-y-1">
                        {result.roadmap_90dias.mes3.map((item, i) => (
                          <li key={i} className="text-gray-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result.kpis && (
              <div className="bg-gray-900 border border-indigo-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">KPIs Principais</h4>
                <ul className="space-y-2">
                  {result.kpis.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">📊</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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

  const renderMarketing = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-white">Estratégia de Marketing 30 Dias</h2>
      </div>

      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Nome do Produto/Serviço</label>
          <input type="text" value={marketingForm.product} onChange={(e) => setMarketingForm({...marketingForm, product: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Seu produto" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Público-alvo</label>
          <input type="text" value={marketingForm.audience} onChange={(e) => setMarketingForm({...marketingForm, audience: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Descreva seu público" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Orçamento Disponível</label>
          <input type="text" value={marketingForm.budget} onChange={(e) => setMarketingForm({...marketingForm, budget: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: R$ 5.000" />
        </div>

        <button onClick={generateMarketingStrategy} disabled={loading || !marketingForm.product || !marketingForm.audience || !marketingForm.budget} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Gerando Estratégia...' : 'Gerar Estratégia de Marketing'}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>

          <div id="result-content" className="space-y-4">
            {result.frase_impacto && (
              <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border border-green-500/50 rounded-lg p-4 text-center">
                <p className="text-lg italic text-green-100 font-semibold">"{result.frase_impacto}"</p>
              </div>
            )}

            {result.canais_prioritarios && (
              <div className="bg-gray-900 border border-purple-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-4">Canais Prioritários</h4>
                <ul className="space-y-2">
                  {result.canais_prioritarios.map((canal, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{canal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.primeiras_acoes && (
              <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-4">Primeiras Ações</h4>
                <ol className="space-y-2">
                  {result.primeiras_acoes.map((acao, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 font-bold">{i + 1}.</span>
                      <span>{acao}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {result.calendario_30dias && (
              <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-4">Calendário 30 Dias</h4>
                <div className="space-y-2">
                  {result.calendario_30dias.map((semana, i) => (
                    <div key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">📅</span>
                      <span>{semana}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.metricas_acompanhar && (
              <div className="bg-gray-900 border border-yellow-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-4">Métricas para Acompanhar</h4>
                <ul className="space-y-2">
                  {result.metricas_acompanhar.map((metrica, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">📊</span>
                      <span>{metrica}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.budget_allocation && (
              <div className="bg-gray-900 border border-red-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-400 mb-2">Alocação de Orçamento</h4>
                <p className="text-gray-300">{result.budget_allocation}</p>
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

  const renderPitch = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Mic className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-white">Pitch de Elevador</h2>
      </div>

      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Nome do Negócio</label>
          <input type="text" value={pitchForm.businessName} onChange={(e) => setPitchForm({...pitchForm, businessName: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Seu negócio" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Problema que Resolve</label>
          <textarea value={pitchForm.problemStatement} onChange={(e) => setPitchForm({...pitchForm, problemStatement: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Qual problema você resolve?" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Sua Solução</label>
          <textarea value={pitchForm.solution} onChange={(e) => setPitchForm({...pitchForm, solution: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="2" placeholder="Como você resolve?" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Público-alvo</label>
          <input type="text" value={pitchForm.targetAudience} onChange={(e) => setPitchForm({...pitchForm, targetAudience: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Quem é seu cliente?" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Seu Diferencial</label>
          <input type="text" value={pitchForm.differentiator} onChange={(e) => setPitchForm({...pitchForm, differentiator: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="O que te diferencia?" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Chamada à Ação</label>
          <input type="text" value={pitchForm.callToAction} onChange={(e) => setPitchForm({...pitchForm, callToAction: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Próximo passo?" />
        </div>

        <button onClick={generateElevatorPitch} disabled={loading || !pitchForm.businessName} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">
          {loading ? 'Gerando Pitch...' : 'Gerar Pitch de Elevador'}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={exportToPDF} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>

          <div id="result-content" className="space-y-4">
            {result.pitch30 && (
              <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Pitch 30 Segundos</h4>
                <p className="text-gray-300 italic">"{result.pitch30}"</p>
              </div>
            )}

            {result.pitch60 && (
              <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Pitch 60 Segundos</h4>
                <p className="text-gray-300 italic">"{result.pitch60}"</p>
              </div>
            )}

            {result.pitch120 && (
              <div className="bg-gray-900 border border-purple-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Pitch 2 Minutos</h4>
                <p className="text-gray-300 italic">"{result.pitch120}"</p>
              </div>
            )}

            {result.tips && (
              <div className="bg-gray-900 border border-yellow-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Dicas de Apresentação</h4>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.keywords && (
              <div className="bg-gray-900 border border-red-400/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-400 mb-3">Palavras-chave para Memorizar</h4>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword, i) => (
                    <span key={i} className="bg-red-900/30 text-red-300 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold">MentorIA</h1>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex gap-2">
            <button onClick={() => { setActiveTab('home'); setResult(null); }} className={`px-4 py-2 rounded transition-colors ${activeTab === 'home' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>
              Home
            </button>
            <button onClick={() => { setActiveTab('validator'); setResult(null); }} className={`px-4 py-2 rounded transition-colors ${activeTab === 'validator' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>
              Validador
            </button>
            <button onClick={() => { setActiveTab('diagnostic'); setResult(null); }} className={`px-4 py-2 rounded transition-colors ${activeTab === 'diagnostic' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>
              Diagnóstico
            </button>
            <button onClick={() => { setActiveTab('pricing'); setResult(null); }} className={`px-4 py-2 rounded transition-colors ${activeTab === 'pricing' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>
              Preços
            </button>
            <button onClick={() => { setActiveTab('planner'); setResult(null); }} className={`px-4 py-2 rounded transition-colors ${activeTab === 'planner' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>
              Plano
            </button>
            <button onClick={() => { setActiveTab('marketing'); setResult(null); }} className={`px-4 py-2 rounded transition-colors ${activeTab === 'marketing' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>
              Marketing
            </button>
            <button onClick={() => { setActiveTab('pitch'); setResult(null); }} className={`px-4 py-2 rounded transition-colors ${activeTab === 'pitch' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>
              Pitch
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-purple-500/20 p-4 space-y-2">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); setResult(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">Home</button>
            <button onClick={() => { setActiveTab('validator'); setMobileMenuOpen(false); setResult(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">Validador</button>
            <button onClick={() => { setActiveTab('diagnostic'); setMobileMenuOpen(false); setResult(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">Diagnóstico</button>
            <button onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); setResult(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">Preços</button>
            <button onClick={() => { setActiveTab('planner'); setMobileMenuOpen(false); setResult(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">Plano</button>
            <button onClick={() => { setActiveTab('marketing'); setMobileMenuOpen(false); setResult(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">Marketing</button>
            <button onClick={() => { setActiveTab('pitch'); setMobileMenuOpen(false); setResult(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">Pitch</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'validator' && renderValidator()}
        {activeTab === 'diagnostic' && renderDiagnostic()}
        {activeTab === 'pricing' && renderPricing()}
        {activeTab === 'planner' && renderPlanner()}
        {activeTab === 'marketing' && renderMarketing()}
        {activeTab === 'pitch' && renderPitch()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-purple-500/20 mt-12 py-8 text-center text-gray-400">
        <p>© 2024 MentorIA. Desenvolvido com IA para empreendedores.</p>
        <p className="text-sm mt-2">Powered by Groq API - Llama 3.3 70B</p>
      </footer>
    </div>
  );
};

export default MentorIA;
