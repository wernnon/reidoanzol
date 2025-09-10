import React, { useState } from 'react';
import styles from './Formulario.module.css';

// Função para gerar um código aleatório de 5 dígitos
const generateCode = () => {
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  console.log("🔑 Código de inscrição gerado:", code);
  return code;
};

// Função para formatar número de telefone
const formatPhone = (value) => {
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');
  let formatted = '';
  if (numbers.length <= 2) formatted = `(${numbers}`;
  else if (numbers.length <= 7) formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  else formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;

  console.log("📞 Formatando telefone:", value, "→", formatted);
  return formatted;
};

function FormularioPage() {
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

  const [registrationCode, setRegistrationCode] = useState(generateCode());
  const [formData, setFormData] = useState(initialFormState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  // --- Funções de input ---
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === 'leaderPhone') {
      formattedValue = formatPhone(value);
    }
    console.log(`✏️ Alterando campo "${name}":`, formattedValue);
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log(`☑️ Alterando checkbox "${name}":`, checked);
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleMemberChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newMembers = [...formData.members];
    let formattedValue = value;

    if (type === 'checkbox') {
      formattedValue = checked;
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    console.log(`👤 Alterando integrante ${index + 1}, campo "${name}":`, formattedValue);
    newMembers[index][name] = formattedValue;
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const addMember = () => {
    if (formData.members.length < 4) {
      console.log("➕ Adicionando novo integrante...");
      setFormData(prev => ({ ...prev, members: [...prev.members, initialMemberState] }));
    } else {
      console.warn("⚠️ Tentativa de adicionar mais de 4 integrantes");
      alert('A equipe pode ter no máximo 4 integrantes.');
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 1) {
      console.log(`🗑️ Removendo integrante ${index + 1}`);
      const newMembers = [...formData.members];
      newMembers.splice(index, 1);
      setFormData(prev => ({ ...prev, members: newMembers }));
    } else {
      console.warn("⚠️ Tentativa de remover o último integrante");
      alert('A equipe deve ter no mínimo 1 integrante.');
    }
  };

  const resetForm = () => {
    console.log("🔄 Resetando formulário...");
    setFormData(initialFormState);
    setRegistrationCode(generateCode());
  };

  // --- Funções do modal de termos ---
  const openTermsModal = () => {
    console.log("📜 Abrindo modal de termos");
    setIsTermsModalVisible(true);
  };
  const closeTermsModal = () => {
    console.log("📜 Fechando modal de termos");
    setIsTermsModalVisible(false);
  };

  // --- Envio do formulário ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("🚀 Enviando formulário...");

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
        arrais: m.arrais,
        isMinor: m.isMinor,
      })),
      registrationCode,
    };

    console.log("📦 Dados enviados para API:", submissionData);

    try {
      const response = await fetch("https://reidoanzol-api.vercel.app/api/register-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      console.log("✅ Resposta da API:", result);

      if (result.success) {
        console.log("🎉 Inscrição concluída com sucesso!");
        setIsModalVisible(true);
      } else {
        console.error("❌ Erro da API:", result);
        alert("Erro ao enviar inscrição");
      }
    } catch (error) {
      console.error("💥 Erro de conexão com a API:", error);
      alert("Erro de conexão com a API");
    }
  };

  const closeModal = () => {
    console.log("❎ Fechando modal de sucesso");
    setIsModalVisible(false);
    resetForm();
  };

  // --- JSX do Formulário ---
  return (
    <>
      {isModalVisible && (
        <div className={styles.modalOverlay}>
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
          <div className={styles.modalContentTerms}>
            <h1>Termos de Uso de Imagem e Dados</h1>
            {/* conteúdo dos termos */}
            <button onClick={closeTermsModal} className={styles.modalButton}>Fechar</button>
          </div>
        </div>
      )}

      <main className={styles.registrationContainer}>
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
