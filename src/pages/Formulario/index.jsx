// src/pages/Formulario.jsx
import React, { useState, useEffect } from 'react'; // Importe useEffect para hooks
import styles from './Formulario.module.css';

console.log('Formulario.jsx carregado!'); // Log no carregamento do arquivo

// Função para gerar um código aleatório de 5 dígitos
const generateCode = () => {
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  console.log('Código de inscrição gerado:', code);
  return code;
};

// Função para formatar número de telefone
const formatPhone = (value) => {
  console.log('Formatando telefone...');
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

function FormularioPage() {
  console.log('O componente FormularioPage foi renderizado!');

  useEffect(() => {
    console.log('O componente FormularioPage foi montado!');
    return () => {
      console.log('O componente FormularioPage será desmontado!');
    };
  }, []);

  const initialMemberState = { fullName: '', phone: '', cpf: '', isDriver: false, arrais: '', isMinor: false };
  const initialFormState = {
    teamName: '',
    leaderName: '',
    leaderPhone: '',
    leaderCpf: '',
    leaderEmail: '',
    members: [initialMemberState],
    termsImage: false,
    termsRules: false,
  };

  const [registrationCode, setRegistrationCode] = useState(() => {
    const code = generateCode();
    console.log('Estado inicial do código de inscrição:', code);
    return code;
  });
  const [formData, setFormData] = useState(initialFormState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  // Use useEffect para monitorar as mudanças no formData
  useEffect(() => {
    console.log('O estado "formData" foi atualizado. Estado atual:', formData);
  }, [formData]);
  
  // --- Funções de input ---
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`Líder: Input '${name}' alterado para '${value}'.`);
    let formattedValue = value;
    if (name === 'leaderPhone') {
      formattedValue = formatPhone(value);
    }
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log(`Checkbox '${name}' alterado para '${checked}'.`);
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleMemberChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    console.log(`Integrante ${index + 1}: Input '${name}' alterado para '${type === 'checkbox' ? checked : value}'.`);
    const newMembers = [...formData.members];
    let formattedValue = value;
    if (type === 'checkbox') {
      formattedValue = checked;
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }
    newMembers[index][name] = formattedValue;
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const addMember = () => {
    console.log('Tentando adicionar novo integrante...');
    if (formData.members.length < 4) {
      setFormData(prev => ({ ...prev, members: [...prev.members, initialMemberState] }));
      console.log('Integrante adicionado. Total:', formData.members.length + 1);
    } else {
      alert('A equipe pode ter no máximo 4 integrantes.');
      console.log('Falha ao adicionar integrante. Limite máximo atingido.');
    }
  };

  const removeMember = (index) => {
    console.log(`Tentando remover o integrante ${index + 1}...`);
    if (formData.members.length > 1) {
      const newMembers = [...formData.members];
      newMembers.splice(index, 1);
      setFormData(prev => ({ ...prev, members: newMembers }));
      console.log('Integrante removido. Total:', formData.members.length - 1);
    } else {
      alert('A equipe deve ter no mínimo 1 integrante.');
      console.log('Falha ao remover integrante. Limite mínimo atingido.');
    }
  };

  const resetForm = () => {
    console.log('Redefinindo o formulário...');
    setFormData(initialFormState);
    setRegistrationCode(generateCode());
    console.log('Formulário redefinido para o estado inicial.');
  };

  // --- Funções do modal de termos ---
  const openTermsModal = () => {
    console.log('Abrindo modal de termos...');
    setIsTermsModalVisible(true);
  };
  const closeTermsModal = () => {
    console.log('Fechando modal de termos...');
    setIsTermsModalVisible(false);
  };

  // --- Envio do formulário ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Formulário enviado. Validando dados...');

    const submissionData = {
      teamName: formData.teamName,
      leader: {
        nome: formData.leaderName,
        email: formData.leaderEmail,
        telefone: formData.leaderPhone,
        cpf: formData.leaderCpf,
      },
      members: formData.members.map((m) => ({
        nome: m.fullName,
        telefone: m.phone,
        cpf: m.cpf,
        isDriver: m.isDriver,
      })),
      registrationCode,
    };

    console.log('Dados a serem enviados:', submissionData);

    try {
      console.log('Enviando dados para a API...');
      const response = await fetch("https://reidoanzol-api.vercel.app/api/register-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      console.log('Resposta da API recebida. Status:', response.status);
      const result = await response.json();
      console.log('Resultado da API:', result);

      if (result.success) {
        console.log('Inscrição concluída com sucesso. Exibindo modal...');
        setIsModalVisible(true);
      } else {
        console.error('Erro no envio da inscrição. Mensagem da API:', result.message);
        alert("Erro ao enviar inscrição");
      }
    } catch (error) {
      console.error('Erro de conexão com a API:', error);
      alert("Erro de conexão com a API");
    }
  };

  const closeModal = () => {
    console.log('Fechando modal de sucesso e redefinindo formulário...');
    setIsModalVisible(false);
    resetForm();
  };

  // --- JSX do Formulário ---
  return (
    <>
      {console.log('Iniciando renderização do JSX do FormularioPage...')}
      {isModalVisible && (
        <div className={styles.modalOverlay}>
          {console.log('Modal de sucesso visível.')}
          <div className={styles.modalContent}>
            <span className={styles.modalIcon}>✔️</span>
            <h2>Inscrição Concluída!</h2>
            <p>Sua equipe foi inscrita com sucesso no torneio. Boa sorte!</p>
            <button onClick={closeModal} className={styles.modalButton}>Fechar</button>
          </div>
        </div>
      )}

      {isTermsModalVisible && (
        <div className={styles.modalOverlay}>
          {console.log('Modal de termos visível.')}
          <div className={styles.modalContentTerms}>
            <h1>Termos de Uso de Imagem e Dados</h1>
            <h2>1. Escopo e Propósito</h2>
            <p>Este documento estabelece os termos para a coleta, processamento, armazenamento e uso de dados, incluindo imagens, para fins de <strong>Business Intelligence (BI)</strong> e gestão de <strong>Data Center</strong>. O objetivo é garantir a transparência e a conformidade legal, protegendo a privacidade dos indivíduos.</p>
            <h2>2. Uso de Imagens</h2>
            <ul>
              <li><strong>Finalidade:</strong> As imagens serão utilizadas exclusivamente para análise de BI e otimização de operações de Data Center, como:
                  <ul>
                      <li>Monitoramento e segurança do ambiente físico.</li>
                      <li>Análise de fluxo de pessoas para otimizar layout e recursos.</li>
                      <li>Verificação do bom funcionamento de equipamentos.</li>
                  </ul>
              </li>
              <li><strong>Restrições:</strong> As imagens não serão utilizadas para reconhecimento facial ou identificação individual sem consentimento expresso e separado, em conformidade com as leis de proteção de dados.</li>
            </ul>
            <h2>3. Uso de Dados</h2>
            <ul>
              <li><strong>Coleta:</strong> A empresa coleta dados de diversas fontes (sistemas internos, registros de acesso, sensores, etc.).</li>
              <li><strong>Finalidade:</strong> Os dados serão processados para:
                  <ul>
                      <li>Geração de relatórios e painéis de controle.</li>
                      <li>Análise preditiva para otimizar o desempenho.</li>
                      <li>Otimização da alocação de recursos em tempo real.</li>
                      <li>Tomada de decisões estratégicas de negócio.</li>
                  </ul>
              </li>
              <li><strong>Anonimização:</strong> Sempre que possível, os dados serão anonimizados ou pseudonimizados para proteger a privacidade dos indivíduos.</li>
            </ul>
            <h2>4. Segurança e Armazenamento</h2>
            <p>Todos os dados e imagens serão armazenados em um ambiente de Data Center seguro, com medidas de proteção robustas, incluindo criptografia, controle de acesso restrito e auditorias regulares para prevenir acessos não autorizados e vazamentos de dados.</p>
            <h2>5. Direitos do Titular dos Dados</h2>
            <p>Em conformidade com a legislação aplicável (como a <strong>LGPD</strong>), o titular dos dados tem o direito de:</p>
            <ul>
                <li>Acessar os seus dados.</li>
                <li>Solicitar a correção ou exclusão dos dados.</li>
                <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
            <h2>6. Aceitação dos Termos</h2>
            <p>O uso continuado dos nossos serviços implica na aceitação destes termos. A empresa se reserva o direito de atualizar este documento, com as alterações sendo comunicadas aos usuários.</p>
            <button onClick={closeTermsModal} className={styles.modalButton}>Fechar</button>
          </div>
        </div>
      )}

      <main className={styles.registrationContainer}>
        {console.log('Renderizando o formulário...')}
        <title>Inscrição - PVH Pesca Show</title>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1>Formulário de Inscrição</h1>
            <p>Preencha os dados abaixo para garantir a vaga da sua equipe no torneio.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 1. Informações da Equipe */}
            <fieldset className={styles.formSection}>
              <legend>1. Informações da Equipe</legend>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="teamName">Nome da Equipe</label>
                  <input type="text" id="teamName" name="teamName" value={formData.teamName} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="leaderName">Nome do Líder da Equipe</label>
                  <input type="text" id="leaderName" name="leaderName" value={formData.leaderName} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="leaderPhone">Telefone do Líder</label>
                  <input type="tel" id="leaderPhone" name="leaderPhone" placeholder="(99) 99999-9999" value={formData.leaderPhone} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="leaderCpf">CPF do Líder</label>
                  <input type="text" id="leaderCpf" name="leaderCpf" placeholder="99999999999" value={formData.leaderCpf} onChange={handleInputChange} required maxLength="11" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="leaderEmail">Email do Líder</label>
                  <input type="email" id="leaderEmail" name="leaderEmail" placeholder="seuemail@exemplo.com" value={formData.leaderEmail} onChange={handleInputChange} required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registrationCode">Código de Inscrição (Guarde este código)</label>
                <input type="text" id="registrationCode" name="registrationCode" value={registrationCode} readOnly className={styles.readOnlyInput} />
              </div>
            </fieldset>

            {/* 2. Dados dos Integrantes */}
            <fieldset className={styles.formSection}>
              <legend>2. Dados dos Integrantes</legend>
              {formData.members.map((member, index) => (
                <div key={index} className={styles.memberCard}>
                  {console.log(`Renderizando card do integrante ${index + 1}`)}
                  <div className={styles.memberHeader}>
                    <h4>Integrante {index + 1}</h4>
                    {formData.members.length > 1 && (
                      <button type="button" className={styles.removeMemberButton} onClick={() => removeMember(index)}>Remover</button>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`fullName-${index}`}>Nome Completo do Integrante</label>
                    <input type="text" id={`fullName-${index}`} name="fullName" value={member.fullName} onChange={e => handleMemberChange(index, e)} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`phone-${index}`}>Número de Celular do Integrante</label>
                    <input type="tel" id={`phone-${index}`} name="phone" placeholder="(99) 99999-9999" value={member.phone || ''} onChange={e => handleMemberChange(index, e)} required />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor={`cpf-${index}`}>CPF do Integrante</label>
                    <input type="text" id={`cpf-${index}`} name="cpf" placeholder="99999999999" value={member.cpf || ''} onChange={e => handleMemberChange(index, e)} required maxLength="11" />
                  </div>

                  <div className={styles.checkboxGroup}>
                    <input type="checkbox" id={`isDriver-${index}`} name="isDriver" checked={member.isDriver} onChange={e => handleMemberChange(index, e)} />
                    <label htmlFor={`isDriver-${index}`}>É o condutor da embarcação?</label>
                  </div>

                  {member.isDriver && (
                    <div className={styles.formGroup} style={{ marginLeft: '2rem' }}>
                      <label htmlFor={`arrais-${index}`}>Nº da Habilitação Fluvial (ARRAIS)</label>
                      <input type="text" id={`arrais-${index}`} name="arrais" value={member.arrais} onChange={e => handleMemberChange(index, e)} required />
                    </div>
                  )}

                  <div className={styles.checkboxGroup}>
                    <input type="checkbox" id={`isMinor-${index}`} name="isMinor" checked={member.isMinor} onChange={e => handleMemberChange(index, e)} />
                    <label htmlFor={`isMinor-${index}`}>É menor de idade?</label>
                  </div>

                  {member.isMinor && (
                    <div className={styles.minorWarning}>
                      <strong>ATENÇÃO:</strong> É obrigatório apresentar autorização do responsável legal.
                    </div>
                  )}
                </div>
              ))}
              {formData.members.length < 4 && (
                <button type="button" className={styles.addMemberButton} onClick={addMember}>+ Adicionar Integrante</button>
              )}
            </fieldset>

            {/* 3. Termos e Acordos */}
            <fieldset className={styles.formSection}>
              <legend>3. Termos e Acordos</legend>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="termsRules" name="termsRules" checked={formData.termsRules} onChange={handleCheckboxChange} required />
                <label htmlFor="termsRules">
                  Declaro que todos os integrantes da equipe leram e concordam com o regulamento do torneio, incluindo a obrigatoriedade do uso de coletes salva-vidas.
                  <button type="button" className={styles.linkButton} onClick={openTermsModal}>Ver termos</button>
                </label>
              </div>
            </fieldset>

            <div className={styles.submitContainer}>
              <button type="submit" className={styles.submitButton}>Confirmar Inscrição</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default FormularioPage;