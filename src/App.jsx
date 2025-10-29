import React, { useState } from 'react';
import { Lightbulb, FileText, TrendingUp, Menu, X, Sparkles, CheckCircle, AlertCircle, Download } from 'lucide-react';

const GROQ_API_KEY = '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';

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

  const analyzeIdea = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

  const generateBusinessPlan = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

  const generateMarketingStrategy = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
  "metricas_acompanhar": ["Métrica 1 com meta numérica", "Métrica 2 com resultado esperado"]
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

  const exportToPDF = () => {
    const content = document.getElementById('business-plan-content') || 
                    document.getElementById('idea-validation-content') ||
                    document.getElementById('marketing-strategy-content');
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

  const renderHome = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Sparkles className="w-16 h-16 text-purple-500" />
        </div>
        <h1 className="text-4xl font-bold text-white">MentorIA</h1>
        <p className="text-xl text-gray-300">Seu mentor de negócios com inteligência artificial</p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Valide ideias, crie planos de negócio e desenvolva estratégias de marketing com ajuda de IA avançada.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div onClick={() => setActiveTab('validator')} className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-all cursor-pointer group">
          <Lightbulb className="w-12 h-12 text-purple-500 mb-4 group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-bold text-white mb-2">Validador de Ideias</h3>
          <p className="text-gray-400">Analise a viabilidade da sua ideia de negócio em minutos</p>
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

          <div id="idea-validation-content" className="space-y-4">
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
                    {result.pontos_fortes.map((ponto, idx) => (
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
                    {result.pontos_atencao.map((ponto, idx) => (
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
                    {result.proximos_passos.map((passo, idx) => (
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

          <div id="business-plan-content">
            {result.frase_impacto && (
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/50 rounded-lg p-4 text-center mb-4">
                <p className="text-lg italic text-purple-100 font-semibold">"{result.frase_impacto}"</p>
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Resumo Executivo</h3>
              <p className="text-gray-200 leading-relaxed">{result.resumo_executivo}</p>
            </div>

            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">Análise de Mercado</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-purple-400 font-semibold mb-1">+ Tamanho do Mercado</h4>
                  <p className="text-gray-300">{result.analise_mercado.tamanho_mercado}</p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-1">+ Público-Alvo</h4>
                  <p className="text-gray-300">{result.analise_mercado.publico_alvo}</p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-1">+ Tendências</h4>
                  <p className="text-gray-300">{result.analise_mercado.tendencias}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">Estrutura de Custos</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Investimento Inicial</h4>
                  <ul className="space-y-1">
                    {result.estrutura_custos.investimento_inicial.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Custos Fixos Mensais</h4>
                  <ul className="space-y-1">
                    {result.estrutura_custos.custos_fixos_mensais.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Custos Variáveis</h4>
                  <ul className="space-y-1">
                    {result.estrutura_custos.custos_variaveis.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">Estratégia de Receita</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-green-400 font-semibold mb-1">+ Precificação</h4>
                  <p className="text-gray-300">{result.estrategia_receita.precificacao}</p>
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-1">+ Projeção Mensal</h4>
                  <p className="text-gray-300">{result.estrategia_receita.projecao_mensal}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">Vantagens Competitivas</h3>
              <ul className="space-y-2">
                {result.vantagens_competitivas.map((item, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start gap-2">
                    <span className="text-green-400">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 border border-yellow-500/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">Análise de Riscos</h3>
              <div className="space-y-3">
                {result.analise_riscos.map((item, idx) => (
                  <div key={idx} className="bg-black border border-gray-800 rounded p-3">
                    <h4 className="text-yellow-400 font-semibold mb-1">- Risco: {item.risco}</h4>
                    <p className="text-gray-300"><span className="text-green-400">Mitigação:</span> {item.mitigacao}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">Roadmap 90 Dias</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-400 font-bold mb-2">Mês 1</h4>
                  <ul className="space-y-1">
                    {result.roadmap_90dias.mes1.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple-400 font-bold mb-2">Mês 2</h4>
                  <ul className="space-y-1">
                    {result.roadmap_90dias.mes2.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple-400 font-bold mb-2">Mês 3</h4>
                  <ul className="space-y-1">
                    {result.roadmap_90dias.mes3.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-4">KPIs e Métricas de Sucesso</h3>
              <ul className="space-y-2">
                {result.kpis.map((item, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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

  const renderMarketing = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-white">Estratégia de Marketing</h2>
      </div>

      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Produto ou serviço</label>
          <textarea value={marketingForm.product} onChange={(e) => setMarketingForm({...marketingForm, product: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" rows="3" placeholder="Ex: Curso online de fotografia..." />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Público-alvo</label>
          <input type="text" value={marketingForm.audience} onChange={(e) => setMarketingForm({...marketingForm, audience: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: Jovens entre 18-30 anos..." />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Orçamento mensal para marketing</label>
          <input type="text" value={marketingForm.budget} onChange={(e) => setMarketingForm({...marketingForm, budget: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="Ex: R$ 500 ou Zero" />
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

          <div id="marketing-strategy-content" className="space-y-4">
            {result.frase_impacto && (
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/50 rounded-lg p-4 text-center">
                <p className="text-lg italic text-purple-100 font-semibold">"{result.frase_impacto}"</p>
              </div>
            )}

            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-6">
              <h3 className="text-2xl font-bold text-white">Sua Estratégia de Marketing</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Canais Prioritários</h4>
                  <ul className="space-y-2">
                    {result.canais_prioritarios.map((canal, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>{canal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Primeiras Ações</h4>
                  <ol className="space-y-2">
                    {result.primeiras_acoes.map((acao, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 font-bold">{idx + 1}.</span>
                        <span>{acao}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Calendário 30 Dias</h4>
                  <div className="space-y-2">
                    {result.calendario_30dias.map((semana, idx) => (
                      <div key={idx} className="bg-black border border-gray-800 rounded p-3">
                        <p className="text-gray-300">{semana}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Métricas para Acompanhar</h4>
                  <ul className="space-y-2">
                    {result.metricas_acompanhar.map((metrica, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>{metrica}</span>
                      </li>
                    ))}
                  </ul>
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

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-xl font-bold">MentorIA</span>
            </div>

            <div className="hidden md:flex space-x-4">
              <button onClick={() => {setActiveTab('home'); setResult(null);}} className={`px-4 py-2 rounded transition-colors ${activeTab === 'home' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}>Início</button>
              <button onClick={() => {setActiveTab('validator'); setResult(null);}} className={`px-4 py-2 rounded transition-colors ${activeTab === 'validator' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}>Validador</button>
              <button onClick={() => {setActiveTab('planner'); setResult(null);}} className={`px-4 py-2 rounded transition-colors ${activeTab === 'planner' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}>Plano de Negócios</button>
              <button onClick={() => {setActiveTab('marketing'); setResult(null);}} className={`px-4 py-2 rounded transition-colors ${activeTab === 'marketing' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}>Marketing</button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button onClick={() => {setActiveTab('home'); setMobileMenuOpen(false); setResult(null);}} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'home' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Início</button>
              <button onClick={() => {setActiveTab('validator'); setMobileMenuOpen(false); setResult(null);}} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'validator' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Validador</button>
              <button onClick={() => {setActiveTab('planner'); setMobileMenuOpen(false); setResult(null);}} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'planner' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Plano de Negócios</button>
              <button onClick={() => {setActiveTab('marketing'); setMobileMenuOpen(false); setResult(null);}} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'marketing' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Marketing</button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'validator' && renderValidator()}
        {activeTab === 'planner' && renderPlanner()}
        {activeTab === 'marketing' && renderMarketing()}
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
