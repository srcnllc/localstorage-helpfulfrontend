import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data,setData]=useState([]);
  const [form,setForm]=useState({
    user:'',
    gitHubUrl:'',
    content:''
  })
  const saveItem =()=>{
    if(form.user === "" || form.gitHubUrl === "" || form.content ===""){ alert('Lütfen boş alanları doldurunuz!');return;}
    data.push({
      ...form
    });
    localStorage.setItem("data",JSON.stringify(data))
    setForm({
      user:"",
      gitHubUrl:"",
      content:""
    })
  }
  useEffect(()=>{
    const data1 = localStorage.getItem('data') ?? [];
    setData(Array.isArray(data1) ? [] : JSON.parse(data1));
  },[]);

  const removeItem = (item,index) => {
    data.splice(index,1);
    localStorage.setItem('data',JSON.stringify(data));
    setData([...data])
  }
  return (
    <div className="App">
      <p className='title'>Front End Developer İçin Kaynak ve Önerilerde Bulun...</p>
      <div className='form'>
        <div className='inputs'> 
          <input className='input' placeholder='İsim Soyisim' onChange={(event)=>setForm({...form,user:event.target.value})} value={form.user}/>
          <input className='input' placeholder='GitHub Kullanıcı Adı' onChange={(event)=>setForm({...form,gitHubUrl:event.target.value})} value={form.gitHubUrl}/>
        </div>
        <textarea className='textinput' placeholder='Önerilerinizi Giriniz !' onChange={(event)=>setForm({...form,content:event.target.value})} value={form.content}/>
        <button className='button' onClick={saveItem}>Ekle</button>
      </div>
      <hr/>
      <div>
        {data.map((item,index) => (
          <div className='content-item' key={index}>
            <div className='content-item-list'>
              <a target='blank' href={`https://github.com/${item.gitHubUrl}`}>{item.user}</a>
              <p>{`"${item.content}"`}</p>
            </div>
            <button onClick={()=>removeItem(item,index)} className='exit'>Yorumu Sil</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
