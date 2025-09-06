import React, { useState } from 'react';
import styles from './Formulario.module.css';

function FormularioPage() {
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [members, setMembers] = useState([
    { fullName: '', license: '', isDriver: false, arrais: '', isMinor: false }
  ]);
  const [termsImage, setTermsImage] = useState(false);
  const [termsRules, setTermsRules] = useState(false);

  const handleMemberChange = (index, event) => {
    const values = [...members];
    const { name, value, type, checked } = event.target;
    values[index][name] = type === 'checkbox' ? checked : value;
    setMembers(values);
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { fullName: '', license: '', isDriver: false, arrais: '', isMinor: false }]);
    } else {
      alert('A equipe pode ter no máximo 4 integrantes.');
    }
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      const values = [...members];
      values.splice(index, 1);
      setMembers(values);
    } else {
      alert('A equipe deve ter no mínimo 1 integrante.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você enviaria os dados para um servidor
    console.log({
      teamName,
      leaderName,
      members,
      terms: {
        imageUse: termsImage,
        rulesAgreement: termsRules,
      }
    });
    alert('Inscrição realizada com sucesso! (Verifique o console para ver os dados)');
  };


  return (
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
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="leaderName">Nome do Líder da Equipe</label>
                <input
                  type="text"
                  id="leaderName"
                  name="leaderName"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* --- 2. Dados dos Integrantes --- */}
          <fieldset className={styles.formSection}>
            <legend>2. Dados dos Integrantes</legend>
            {members.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <div className={styles.memberHeader}>
                  <h4>Integrante {index + 1}</h4>
                  {members.length > 1 && (
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
                  <label htmlFor={`license-${index}`}>Nº da Carteira de Pesca (Amadora, Esportiva ou Profissional)</label>
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
                    <label htmlFor={`arrais-${index}`}>Nº da Habilitação Fluvial (ARRAIS Amadora ou Profissional)</label>
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
            {members.length < 4 && (
              <button type="button" className={styles.addMemberButton} onClick={addMember}>
                + Adicionar Integrante
              </button>
            )}
          </fieldset>

          {/* --- 3. Termos e Acordos --- */}
          <fieldset className={styles.formSection}>
            <legend>3. Termos e Acordos</legend>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="termsImage" checked={termsImage} onChange={e => setTermsImage(e.target.checked)} required />
              <label htmlFor="termsImage">Declaro que a equipe está ciente e concorda com o uso de imagens durante e após a realização do XIII TOPAS.</label>
            </div>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="termsRules" checked={termsRules} onChange={e => setTermsRules(e.target.checked)} required />
              <label htmlFor="termsRules">Declaro que todos os integrantes da equipe leram e concordam com o regulamento do torneio, incluindo a obrigatoriedade do uso de coletes salva-vidas.</label>
            </div>
          </fieldset>

          <div className={styles.submitContainer}>
            <button type="submit" className={styles.submitButton}>
              Realizar Inscrição
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default FormularioPage;