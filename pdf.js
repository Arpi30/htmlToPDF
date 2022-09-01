
const obj = {
  state: [],
  eventFunction: {
    render: () => {
      let comments = ''
      obj.state.forEach( comment => {
        comments += `
          <div>${comment.value}</div>
        `
      })
      obj.htmlTag.commentsDIV.innerHTML = comments
    },
    toPdf: () => {
      let opt = {
        margin:       0,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait'},
      }
      html2pdf().from(obj.htmlTag.commentsDIV).set(opt).save();
    },

    toTxt: () => {
      let blob = new Blob([JSON.stringify(obj.state)], {type:'text/plain'})
      saveAs(blob, 'mentes')
    }
  },
  htmlTag:{
    form: document.getElementById("form"),
    commentsDIV: document.getElementById("comments"),
    pdfCheckBox: document.getElementById("pdfCheckbox"),
    txtCheckBox: document.getElementById("txtCheckbox"),
    saveButton: document.getElementById("saveButton"),
  }
}

obj.htmlTag.form.addEventListener('keypress',(e) => {
  if(e.key === 'Enter'){
    e.preventDefault()
    const value = obj.htmlTag.form['value'].value
    if(!value){
      alert('Please type something')
    }
    obj.state.push({value})
    obj.htmlTag.form['value'].value = ''
    obj.eventFunction.render()
  }
})

obj.htmlTag.saveButton.onclick = (e) => {
  e.preventDefault()
  if(obj.htmlTag.pdfCheckBox.checked){
    obj.eventFunction.toPdf()
  }else if(obj.htmlTag.txtCheckBox.checked){
    obj.eventFunction.toTxt()
  } else{
    alert('I cant download anything if you dont choose')
  }
}