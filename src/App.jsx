import React, { useState } from 'react';
import { Lightbulb, FileText, TrendingUp, Menu, X, Sparkles, CheckCircle, AlertCircle, Download, DollarSign, Zap, Mic } from 'lucide-react';

// Chave da API (idealmente, isso viria de uma variável de ambiente)
const GROQ_API_KEY = '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';

const MentorIA = () => {
  // --- ESTADOS GERAIS ---
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // --- ESTADOS DOS FORMULÁRIOS ---
  const [ideaForm, setIdeaForm] = useState({ idea: '', target: '', problem: '' });
  const [diagnosticForm, setDiagnosticForm] = useState({ businessName: '', stage: '', monthlyRevenue: '', teamSize: '', mainChallenge: '' });
  const [pricingForm, setPricingForm] = useState({ produto: '', custosFixos: '', custosVariaveis: '', tempoProducao: '', margemDesejada: '', concorrentePreco: '', segmento: '', experiencia: '' });
  const [businessForm, setBusinessForm] = useState({ business: '', market: '', investment: '', timeline: '', experience: '', competitors: '', differentials: '' });
  const [marketingForm, setMarketingForm] = useState({ product: '', audience: '', budget: '' });
  const [pitchForm, setPitchForm] = useState({ businessName: '', problemStatement: '', solution: '', differentiator: '' });

  // --- FUNÇÕES DE LÓGICA (API CALLS) ---

  const analyzeIdea = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: 'Você é um mentor de negócios de elite. Retorne APENAS JSON válido.' }, {
            role: 'user', content: `Analise esta ideia como um mentor de negócios de elite (R$ 50k/hora ). Seja direto, estratégico e pragmático.
IDEIA: ${ideaForm.idea} | PÚBLICO: ${ideaForm.target} | PROBLEMA: ${ideaForm.problem}
Retorne APENAS este JSON: {"score": 85, "viabilidade": "alta", "frase_impacto": "Frase curta e estratégica.", "pontos_fortes": ["Força 1", "Força 2"], "pontos_atencao": ["Risco 1", "Risco 2"], "proximos_passos": ["Ação 1", "Ação 2"]}`
          }],
          temperature: 0.7, max_tokens: 1500, response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      if (!data.choices?.[0]) throw new Error('Resposta inválida');
      setResult(JSON.parse(data.choices[0].message.content));
    } catch (error) {
      setResult({ error: true, message: 'Erro ao processar. Tente novamente.' });
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

  const calculatePricing = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: 'Você é um especialista em precificação. Retorne APENAS JSON válido.' }, {
            role: 'user', content: `Calcule o preço ideal.
PRODUTO: ${pricingForm.produto} | CUSTOS FIXOS: R$ ${pricingForm.custosFixos} | CUSTOS VARIÁVEIS: R$ ${pricingForm.custosVariaveis} | MARGEM DESEJADA: ${pricingForm.margemDesejada}% | CONCORRENTE: R$ ${pricingForm.concorrentePreco}
Retorne APENAS este JSON: {"preco_minimo": "500.00", "preco_ideal": "850.00", "preco_premium": "1200.00", "frase_impacto": "Frase sobre a estratégia de preço.", "analise_completa": {"custo_total_unitario": "280.00", "margem_liquida_ideal": "67", "ponto_equilibrio_mensal": "15"}, "alertas_importantes": ["Alerta 1", "Alerta 2"]}`
          }],
          temperature: 0.7, max_tokens: 2500, response_format: { type: "json_object" }
        } )
      });
      const data = await response.json();
      if (!data.choices?.[0]) throw new Error('Resposta inválida');
      setResult(JSON.parse(data.choices[0].message.content));
    } catch (error) {
      setResult({ error: true, message: `Erro ao calcular: ${error.message || 'Tente novamente'}` });
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
          messages: [{ role: 'system', content: 'Você é um consultor de negócios de elite. Retorne APENAS JSON válido.' }, {
            role: 'user', content: `Crie um plano de negócios robusto.
NEGÓCIO: ${businessForm.business} | MERCADO: ${businessForm.market} | INVESTIMENTO: ${businessForm.investment} | DIFERENCIAIS: ${businessForm.differentials}
Retorne APENAS este JSON: {"frase_impacto": "Frase curta sobre o negócio.", "resumo_executivo": "Resumo em 2-3 frases.", "analise_mercado": {"tamanho_mercado": "Tamanho estimado.", "publico_alvo": "Descrição do público."}, "estrategia_receita": {"fontes_receita": ["Fonte 1", "Fonte 2"], "precificacao": "Estratégia de preços."}, "roadmap_90dias": {"mes1": ["Ação 1"], "mes2": ["Ação 1"], "mes3": ["Ação 1"]}}`
          }],
          temperature: 0.7, max_tokens: 3000, response_format: { type: "json_object" }
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

  const generateMarketingStrategy = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: 'Você é um estrategista de marketing de elite. Retorne APENAS JSON válido.' }, {
            role: 'user', content: `Crie uma estratégia de marketing para 30 dias.
PRODUTO: ${marketingForm.product} | PÚBLICO: ${marketingForm.audience} | ORÇAMENTO: ${marketingForm.budget}
Retorne APENAS este JSON: {"frase_impacto": "Frase curta sobre a estratégia.", "canais_prioritarios": ["Canal 1", "Canal 2"], "primeiras_acoes": ["Ação 1", "Ação 2"], "calendario_30dias": ["Semana 1: ações", "Semana 2: ações", "Semana 3: ações", "Semana 4: ações"], "metricas_acompanhar": ["Métrica 1", "Métrica 2"]}`
          }],
          temperature: 0.7, max_tokens: 2000, response_format: { type: "json_object" }
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
    printWindow.document.write(`<html><head><title>MentorIA - Análise</title><style>body{font-family:Arial,sans-serif;padding:20px}h1,h2,h3,h4{color:#333}h1{border-bottom:1px solid #ccc;padding-bottom:10px}</style></head><body><h1>Análise MentorIA</h1>${content.innerHTML}</body></html>`);
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

  const renderValidator = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><Lightbulb className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold text-white">Validador de Ideias</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <textarea value={ideaForm.idea} onChange={(e) => setIdeaForm({ ...ideaForm, idea: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="3" placeholder="Descreva sua ideia de negócio..." />
        <input type="text" value={ideaForm.target} onChange={(e) => setIdeaForm({ ...ideaForm, target: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Quem é seu público-alvo?" />
        <input type="text" value={ideaForm.problem} onChange={(e) => setIdeaForm({ ...ideaForm, problem: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Que problema você resolve?" />
        <button onClick={analyzeIdea} disabled={loading || !ideaForm.idea} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 font-bold py-3 rounded"> {loading ? 'Analisando...' : 'Analisar Ideia'} </button>
      </div>
      {result && !result.error && activeTab === 'validator' && (
        <div id="result-content" className="bg-gray-900 border border-green-400/30 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Análise</h3>
            <div className="text-right"><div className="text-3xl font-bold text-green-400">{result.score}/100</div><div className="text-sm uppercase">{result.viabilidade}</div></div>
          </div>
          {result.frase_impacto && <p className="italic text-green-100 p-3 bg-green-900/30 rounded">"{result.frase_impacto}"</p>}
          <div><h4 className="font-semibold text-green-400">Pontos Fortes</h4><ul className="list-disc pl-5">{result.pontos_fortes?.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
          <div><h4 className="font-semibold text-yellow-400">Pontos de Atenção</h4><ul className="list-disc pl-5">{result.pontos_atencao?.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
          <div><h4 className="font-semibold text-purple-400">Próximos Passos</h4><ol className="list-decimal pl-5">{result.proximos_passos?.map((p, i) => <li key={i}>{p}</li>)}</ol></div>
        </div>
      )}
      {result?.error && <div className="bg-red-900/20 p-4 rounded">{result.message}</div>}
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

  const renderPricing = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-6"><DollarSign className="w-16 h-16 text-green-500 mx-auto mb-4" /><h2 className="text-3xl font-bold">Calculadora de Precificação</h2></div>
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 space-y-4">
        <textarea value={pricingForm.produto} onChange={(e) => setPricingForm({ ...pricingForm, produto: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="2" placeholder="Produto ou Serviço..." />
        <div className="grid md:grid-cols-2 gap-4">
          <input type="number" value={pricingForm.custosFixos} onChange={(e) => setPricingForm({ ...pricingForm, custosFixos: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Custos Fixos Mensais (R$)" />
          <input type="number" value={pricingForm.custosVariaveis} onChange={(e) => setPricingForm({ ...pricingForm, custosVariaveis: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Custo Variável por Unidade (R$)" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="number" value={pricingForm.margemDesejada} onChange={(e) => setPricingForm({ ...pricingForm, margemDesejada: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Margem de Lucro Desejada (%)" />
          <input type="number" value={pricingForm.concorrentePreco} onChange={(e) => setPricingForm({ ...pricingForm, concorrentePreco: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Preço do Concorrente (R$)" />
        </div>
        <button onClick={calculatePricing} disabled={loading || !pricingForm.produto} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 font-bold py-3 rounded">{loading ? 'Calculando...' : 'Calcular Preço'}</button>
      </div>
      {result && !result.error && activeTab === 'pricing' && (
        <div id="result-content" className="space-y-4">
          {result.frase_impacto && <div className="p-4 bg-green-900/30 rounded text-center italic">"{result.frase_impacto}"</div>}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-900/20 rounded text-center"><div className="text-sm text-yellow-400">MÍNIMO</div><div className="text-2xl font-bold">R$ {result.preco_minimo}</div></div>
            <div className="p-4 bg-green-900/30 rounded text-center border-2 border-green-500"><div className="text-sm text-green-400">IDEAL</div><div className="text-3xl font-bold">R$ {result.preco_ideal}</div></div>
            <div className="p-4 bg-purple-900/20 rounded text-center"><div className="text-sm text-purple-400">PREMIUM</div><div className="text-2xl font-bold">R$ {result.preco_premium}</div></div>
          </div>
          {result.analise_completa && <div className="p-4 bg-gray-800 rounded">Custo Unitário: R$ {result.analise_completa.custo_total_unitario} | Ponto de Equilíbrio: {result.analise_completa.ponto_equilibrio_mensal} unidades</div>}
          {result.alertas_importantes && <div className="p-4 bg-red-900/20 rounded"><h4 className="font-semibold text-red-400">Alertas</h4><ul className="list-disc pl-5">{result.alertas_importantes.map((a, i) => <li key={i}>{a}</li>)}</ul></div>}
        </div>
      )}
      {result?.error && <div className="bg-red-900/20 p-4 rounded">{result.message}</div>}
    </div>
  );

  const renderPlanner = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><FileText className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold">Plano de Negócios</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <textarea value={businessForm.business} onChange={(e) => setBusinessForm({ ...businessForm, business: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="3" placeholder="Descreva seu negócio..." />
        <input type="text" value={businessForm.market} onChange={(e) => setBusinessForm({ ...businessForm, market: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Análise de mercado..." />
        <input type="text" value={businessForm.investment} onChange={(e) => setBusinessForm({ ...businessForm, investment: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Investimento disponível..." />
        <textarea value={businessForm.differentials} onChange={(e) => setBusinessForm({ ...businessForm, differentials: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="2" placeholder="Seus diferenciais..." />
        <button onClick={generateBusinessPlan} disabled={loading || !businessForm.business} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 font-bold py-3 rounded">{loading ? 'Gerando Plano...' : 'Gerar Plano de Negócios'}</button>
      </div>
      {result
 && !result.error && activeTab === 'planner' && (
        <div id="result-content" className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
          {result.frase_impacto && <p className="italic text-purple-200 text-center p-3 bg-purple-900/30 rounded">"{result.frase_impacto}"</p>}
          {result.resumo_executivo && <div><h4 className="font-semibold text-purple-400">Resumo Executivo</h4><p>{result.resumo_executivo}</p></div>}
          {result.analise_mercado && <div><h4 className="font-semibold text-purple-400">Análise de Mercado</h4><p>{result.analise_mercado.tamanho_mercado}</p></div>}
          {result.estrategia_receita && <div><h4 className="font-semibold text-green-400">Estratégia de Receita</h4><p>{result.estrategia_receita.precificacao}</p></div>}
          {result.roadmap_90dias && <div><h4 className="font-semibold text-blue-400">Roadmap 90 Dias</h4><ol className="list-decimal pl-5"><li>{result.roadmap_90dias.mes1.join(', ')}</li><li>{result.roadmap_90dias.mes2.join(', ')}</li><li>{result.roadmap_90dias.mes3.join(', ')}</li></ol></div>}
        </div>
      )}
      {result?.error && <div className="bg-red-900/20 p-4 rounded">{result.message}</div>}
    </div>
  );

  const renderMarketing = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><TrendingUp className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold">Estratégia de Marketing</h2></div>
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
        <textarea value={marketingForm.product} onChange={(e) => setMarketingForm({ ...marketingForm, product: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" rows="2" placeholder="Produto ou serviço..." />
        <input type="text" value={marketingForm.audience} onChange={(e) => setMarketingForm({ ...marketingForm, audience: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Público-alvo..." />
        <input type="text" value={marketingForm.budget} onChange={(e) => setMarketingForm({ ...marketingForm, budget: e.target.value })} className="w-full bg-black border border-gray-700 rounded p-3" placeholder="Orçamento de marketing..." />
        <button onClick={generateMarketingStrategy} disabled={loading || !marketingForm.product} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 font-bold py-3 rounded">{loading ? 'Gerando Estratégia...' : 'Gerar Estratégia'}</button>
      </div>
      {result && !result.error && activeTab === 'marketing' && (
        <div id="result-content" className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 space-y-4">
          {result.frase_impacto && <p className="italic text-purple-200 text-center p-3 bg-purple-900/30 rounded">"{result.frase_impacto}"</p>}
          <div><h4 className="font-semibold text-purple-400">Canais Prioritários</h4><ul className="list-disc pl-5">{result.canais_prioritarios?.map((c, i) => <li key={i}>{c}</li>)}</ul></div>
          <div><h4 className="font-semibold text-green-400">Primeiras Ações</h4><ol className="list-decimal pl-5">{result.primeiras_acoes?.map((a, i) => <li key={i}>{a}</li>)}</ol></div>
          <div><h4 className="font-semibold text-blue-400">Calendário 30 Dias</h4><ul className="list-disc pl-5">{result.calendario_30dias?.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        </div>
      )}
      {result?.error && <div className="bg-red-900/20 p-4 rounded">{result.message}</div>}
    </div>
  );

  const renderPitch = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6"><Mic className="w-8 h-8 text-purple-500" /><h2 className="text-3xl font-bold">Pitch de Elevador</h2></div>
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
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}><Sparkles className="w-6 h-6 text-purple-500" /><span className="text-xl font-bold">MentorIA</span></div>
            <div className="hidden md:flex space-x-1">
              <button onClick={() => { setActiveTab('home'); setResult(null); }} className={`px-3 py-2 rounded ${activeTab === 'home' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Início</button>
              <button onClick={() => { setActiveTab('validator'); setResult(null); }} className={`px-3 py-2 rounded ${activeTab === 'validator' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Validador</button>
              <button onClick={() => { setActiveTab('diagnostic'); setResult(null); }} className={`px-3 py-2 rounded ${activeTab === 'diagnostic' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Diagnóstico</button>
              <button onClick={() => { setActiveTab('planner'); setResult(null); }} className={`px-3 py-2 rounded ${activeTab === 'planner' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Plano</button>
              <button onClick={() => { setActiveTab('marketing'); setResult(null); }} className={`px-3 py-2 rounded ${activeTab === 'marketing' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Marketing</button>
              <button onClick={() => { setActiveTab('pitch'); setResult(null); }} className={`px-3 py-2 rounded ${activeTab === 'pitch' ? 'bg-purple-600' : 'hover:bg-gray-800'}`}>Pitch</button>
              <button onClick={() => { setActiveTab('pricing'); setResult(null); }} className={`px-3 py-2 rounded ${activeTab === 'pricing' ? 'bg-green-600' : 'hover:bg-gray-800'}`}>Preços</button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">{mobileMenuOpen ? <X /> : <Menu />}</button>
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
