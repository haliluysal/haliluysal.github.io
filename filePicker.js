const buttonClass = {
  button: document.createElement('button'),
  fileInput: document.createElement('input'),

  init: function (str, accept) {
    const icon = document.createElement('img');
    icon.src = 'img/file-explorer.ico';
    icon.style.verticalAlign = 'middle';
    icon.style.marginRight = '5px';
    icon.style.width = '24px';
    icon.style.height = '24px';

    this.button.innerHTML = str;
    this.button.style.verticalAlign = 'middle';
    this.button.insertBefore(icon, this.button.firstChild);
    this.fileInput.accept = accept;
    this.fileInput.multiple = false;
    this.fileInput.type = 'file';
    this.fileInput.style.display = 'none';
    document.body.appendChild(this.fileInput);
    this.button.addEventListener('click', () => {
      this.fileInput.click();
    });
    this.fileInput.addEventListener('change', () => {
      const table = document.getElementById('file-info-table');
      table.style.display = "table"
      const tableBody = document.getElementById('file-info-table-data');
      // Get the selected file path
      const fileName = this.fileInput.files[0].name;
      const extension = this.fileInput.files[0].name.split('.').pop();
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.fileInput.files[0]);
      reader.onloadend = function () {
        const fileSizeInBytes = reader.result.byteLength;
        const fileSizeInKB = fileSizeInBytes / 1024; // convert to KB
        const fileSizeInMB = fileSizeInKB / 1024; // convert to MB

        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = fileName;
        row.appendChild(nameCell);
        const extensionCell = document.createElement('td');
        extensionCell.textContent = extension;
        row.appendChild(extensionCell);
        const bSizeCell = document.createElement('td');
        bSizeCell.textContent = fileSizeInBytes;
        row.appendChild(bSizeCell);
        const kbSizeCell = document.createElement('td');
        kbSizeCell.textContent = fileSizeInKB.toFixed(2);
        row.appendChild(kbSizeCell);
        const mbSizeCell = document.createElement('td');
        mbSizeCell.textContent = fileSizeInMB.toFixed(2);
        row.appendChild(mbSizeCell);
        tableBody.appendChild(row)
        table.appendChild(tableBody)

        const img = document.getElementById('selected-image');
        const blob = new Blob([reader.result]);
        const url = URL.createObjectURL(blob);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.onload = function () {
          canvas.width = Math.min(image.naturalWidth / 5, 500);
          canvas.height = image.naturalHeight / 5;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          img.src = canvas.toDataURL('image/jpeg');
          URL.revokeObjectURL(url);
        }
        image.src = url;
      }
    })
  }
}
