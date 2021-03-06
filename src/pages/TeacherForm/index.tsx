import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';

function TeacherForm() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduledItems, setScheduleItems] = useState([
        {
            week_day: 0,
            from: '',
            to: ''
        }
    ]);

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        api.post('/class', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduledItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        })
    }

    function setScheduleItemValue(position:number, field: string, value:string) {
        const updatedScheduledItems = scheduledItems.map((item, index) => {
            if(index === position) {
                 return {...item, [field]: value } 
            }
            return item;
        })
        setScheduleItems(updatedScheduledItems);
    }

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduledItems,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ]);
    }

    return  (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            label="Nome completo" name="name" value={name} onChange={(e) => { setName(e.target.value) }}>
                        </Input>
                        <Input 
                            label="Avatar" name="avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }}>
                        </Input>
                        <Input 
                            label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }}>
                        </Input>
                        <TextArea 
                            name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }}>
                        </TextArea>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            label="Matéria"
                            name="subject"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Português', label: 'Portugues' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Química', label: 'Química' }
                            ]}>
                        </Select>
                        <Input 
                            label="Custo da sua hora por aula" name="cost" value={cost} onChange={(e) => { setCost(e.target.value) }}>
                        </Input>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {scheduledItems.map( (scheduledItem, index) => {
                            return (
                                <div key={scheduledItem.week_day} className="schedule-item">
                                <Select 
                                    label="Dia da semana"
                                    name="week_day"
                                    value={scheduledItem.week_day}
                                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value) }
                                    options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '4', label: 'Quinta-feira' },
                                        { value: '5', label: 'Sexta-feira' },
                                        { value: '6', label: 'Sábado' }
                                    ]}>
                                </Select>
                                <Input name="from" label="Das" type="time" 
                                    value={scheduledItem.from} 
                                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}>
                                </Input>
                                <Input name="to" label="Até" type="time" 
                                    value={scheduledItem.to} 
                                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}>
                                </Input>
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Imporante! <br/ >
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;