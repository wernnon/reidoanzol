import React, { useState } from 'react';
import styles from './Formulario.module.css';

// Função para gerar um código aleatório de 5 dígitos
const generateCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

function FormularioPage() {
  const initialMemberState = { fullName: '', license: '', isDriver: false, arrais: '', isMinor: false };
  const initialFormState = {
    teamName: '',
    leaderName: '',
    members: [initialMemberState],
    termsImage: false,
    termsRules: false,
  };

  const [registrationCode, setRegistrationCode] = useState(generateCode());
  const [formData, setFormData] = useState(initialFormState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleMemberChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newMembers = [...formData.members];
    newMembers[index][name] = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const addMember = () => {
    if (formData.members.length < 4) {
      setFormData(prev => ({ ...prev, members: [...prev.members, initialMemberState] }));
    } else {
      alert('A equipe pode ter no máximo 4 integrantes.');
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 1) {
      const newMembers = [...formData.members];
      newMembers.splice(index, 1);
      setFormData(prev => ({ ...prev, members: newMembers }));
    } else {
      alert('A equipe deve ter no mínimo 1 integrante.');
    }
  };
  
  const resetForm = () => {
    setFormData(initialFormState);
    setRegistrationCode(generateCode());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submissionData = { registrationCode, ...formData };

    console.log("Dados Enviados:", submissionData);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    resetForm();
  };

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

      <main className={styles.registrationContainer}>
        <title>Inscrição - PVH Pesca Show</title>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1>Formulário de Inscrição</h1>
            <p>Preencha os dados abaixo para garantir a vaga da sua equipe no torneio.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* --- 1. Informações da Equipe --- */}
            <fieldset className={styles.formSection}>
              <legend>1. Informações da Equipe</legend>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="teamName">Nome da Equipe</label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="leaderName">Nome do Líder da Equipe</label>
                  <input
                    type="text"
                    id="leaderName"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registrationCode">Código de Inscrição (Guarde este código)</label>
                <input
                  type="text"
                  id="registrationCode"
                  name="registrationCode"
                  value={registrationCode}
                  readOnly
                  className={styles.readOnlyInput}
                />
              </div>
            </fieldset>

            {/* --- 2. Dados dos Integrantes --- */}
            <fieldset className={styles.formSection}>
              <legend>2. Dados dos Integrantes</legend>
              {formData.members.map((member, index) => (
                <div key={index} className={styles.memberCard}>
                  <div className={styles.memberHeader}>
                    <h4>Integrante {index + 1}</h4>
                    {formData.members.length > 1 && (
                      <button type="button" className={styles.removeMemberButton} onClick={() => removeMember(index)}>
                        Remover
                      </button>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`fullName-${index}`}>Nome Completo do Integrante</label>
                    <input
                      type="text"
                      id={`fullName-${index}`}
                      name="fullName"
                      value={member.fullName}
                      onChange={e => handleMemberChange(index, e)}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor={`license-${index}`}>Nº da Carteira de Pesca (Amadora, Esportiva ou Profissional) [cite: 1]</label>
                    <input
                      type="text"
                      id={`license-${index}`}
                      name="license"
                      value={member.license}
                      onChange={e => handleMemberChange(index, e)}
                      required
                    />
                  </div>
                  
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id={`isDriver-${index}`}
                      name="isDriver"
                      checked={member.isDriver}
                      onChange={e => handleMemberChange(index, e)}
                    />
                    <label htmlFor={`isDriver-${index}`}>É o condutor da embarcação?</label>
                  </div>

                  {member.isDriver && (
                    <div className={styles.formGroup} style={{ marginLeft: '2rem' }}>
                      <label htmlFor={`arrais-${index}`}>Nº da Habilitação Fluvial (ARRAIS Amadora ou Profissional) [cite: 1]</label>
                      <input
                        type="text"
                        id={`arrais-${index}`}
                        name="arrais"
                        value={member.arrais}
                        onChange={e => handleMemberChange(index, e)}
                        required
                      />
                    </div>
                  )}

                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id={`isMinor-${index}`}
                      name="isMinor"
                      checked={member.isMinor}
                      onChange={e => handleMemberChange(index, e)}
                    />
                    <label htmlFor={`isMinor-${index}`}>É menor de idade?</label>
                  </div>

                  {member.isMinor && (
                    <div className={styles.minorWarning}>
                      <strong>ATENÇÃO:</strong> É obrigatório apresentar no dia do torneio a autorização por escrito do responsável legal para a participação do menor na competição, que deverá estar acompanhado pelo mesmo na embarcação. 
                    </div>
                  )}
                </div>
              ))}
              {formData.members.length < 4 && (
                <button type="button" className={styles.addMemberButton} onClick={addMember}>
                  + Adicionar Integrante
                </button>
              )}
            </fieldset>

            {/* --- 3. Termos e Acordos --- */}
            <fieldset className={styles.formSection}>
              <legend>3. Termos e Acordos</legend>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="termsImage" name="termsImage" checked={formData.termsImage} onChange={handleCheckboxChange} required />
                <label htmlFor="termsImage">Declaro que a equipe está ciente e concorda com o uso de imagens durante e após a realização do XIII TOPAS. </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="termsRules" name="termsRules" checked={formData.termsRules} onChange={handleCheckboxChange} required />
                <label htmlFor="termsRules">Declaro que todos os integrantes da equipe leram e concordam com o regulamento do torneio, incluindo a obrigatoriedade do uso de coletes salva-vidas. </label>
              </div>
            </fieldset>

            <div className={styles.submitContainer}>
              <button type="submit" className={styles.submitButton}>
                Confirmar Inscrição
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default FormularioPage;