
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
    },
    writeToWindow: () => {
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
    }
  },
  downloadProcess: () => {
    obj.htmlTag.boxes.forEach(box => {
      box.onclick = () => {
        if(obj.htmlTag.pdfCheckBox.checked){
          obj.htmlTag.txtCheckBox.disabled = obj.htmlTag.pdfCheckBox.checked
          obj.htmlTag.saveButton.onclick = (e) => {
            e.preventDefault()
            obj.eventFunction.toPdf()
            obj.htmlTag.pdfCheckBox.checked = !obj.htmlTag.pdfCheckBox.checked
            obj.htmlTag.txtCheckBox.disabled = !obj.htmlTag.pdfCheckBox.checked
          }
        }else{
          obj.htmlTag.txtCheckBox.disabled = false
        }
    
        if (obj.htmlTag.txtCheckBox.checked){
          obj.htmlTag.pdfCheckBox.disabled = obj.htmlTag.txtCheckBox.checked
          obj.htmlTag.saveButton.onclick = (e) => {
            e.preventDefault()
            obj.eventFunction.toTxt()
            obj.htmlTag.txtCheckBox.checked = !obj.htmlTag.txtCheckBox.checked
            obj.htmlTag.pdfCheckBox.disabled = !obj.htmlTag.txtCheckBox.checked
          }
        }else{
          obj.htmlTag.pdfCheckBox.disabled = false
        }
      }
    })
  },
  htmlTag:{
    form: document.getElementById("form"),
    commentsDIV: document.getElementById("comments"),
    pdfCheckBox: document.getElementById("pdfCheckbox"),
    txtCheckBox: document.getElementById("txtCheckbox"),
    saveButton: document.getElementById("saveButton"),
    boxes: document.querySelectorAll('.checkbox')
  },
  callFunction: () => {
    obj.downloadProcess()
    obj.eventFunction.writeToWindow()

  }
}

obj.callFunction()
