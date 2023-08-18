async function reservation(event) {
  event.preventDefault();

  const nama = document.getElementById("nama");
  const nohp = document.getElementById("nohp");
  const email = document.getElementById("email");
  const tanggal = document.getElementById("tanggal");
  const jumlah_orang = document.getElementById("jumlah_orang");
  const pesan = document.getElementById("pesan");
  let alert = document.getElementById("alert-reservation");

  if (nama.value == "") {
    nama.style.borderBottom = "3px solid #ff0000";
  } else if (nama.value != "") {
    nama.style.borderBottom = "3px solid #000000";
  }
  if (nohp.value == "") {
    nohp.style.borderBottom = "3px solid #ff0000";
  } else if (nohp.value != "") {
    nohp.style.borderBottom = "3px solid #000000";
  }
  if (email.value == "") {
    email.style.borderBottom = "3px solid #ff0000";
  } else if (email.value != "") {
    email.style.borderBottom = "3px solid #000000";
  }
  if (tanggal.value == "") {
    tanggal.style.borderBottom = "3px solid #ff0000";
  } else if (tanggal.value != "") {
    tanggal.style.borderBottom = "3px solid #000000";
  }
  if (jumlah_orang.value == "") {
    jumlah_orang.style.borderBottom = "3px solid #ff0000";
  } else if (jumlah_orang.value != "") {
    jumlah_orang.style.borderBottom = "3px solid #000000";
  }
  if (pesan.value == "") {
    pesan.style.borderBottom = "3px solid #ff0000";
  } else if (pesan.value != "") {
    pesan.style.borderBottom = "3px solid #000000";
  }
  if (
    nama.value != "" &&
    nohp.value != "" &&
    email.value != "" &&
    tanggal.value != "" &&
    jumlah_orang.value != "" &&
    pesan.value != ""
  ) {
    const LinkWa = `https://wa.me/6282243331812?text=Halo. Nama saya ${nama} dengan no. HP ${nohp} dan email ${email}. Saya ingin reservasi untuk tanggal ${tanggal} dengan jumlah ${jumlah_orang} orang. Pesanan tambahan: ${pesan}. TerimaÂ kasih.
    `;
    window.open(LinkWa, "_blank");
    alert.innerHTML = "Pesan sudah terkirim";
  } else {
    alert.innerHTML = "Harap lengkapi data";
  }
}