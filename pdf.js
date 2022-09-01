const invoice = document.getElementById("invoice")
const button = document.getElementById("download")

let opt = {
    margin:       0,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait'},
  }

button.onclick = () => {
    html2pdf().from(invoice).set(opt).save();
}
        
