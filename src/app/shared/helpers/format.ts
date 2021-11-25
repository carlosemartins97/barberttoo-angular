export function formatCpf(cpf: string) {
  return cpf[0] + cpf[1]+ cpf[2] + '.' + cpf[3] + cpf[4]+ cpf[5] + '.'  + cpf[6] + cpf[7]+ cpf[8] + '-' + cpf[9] + cpf[10];
}

export function formatPhone(phone: string) {
  return '(' +phone[0]+phone[1]+') ' + phone[2]+phone[3]+phone[4]+phone[5]+phone[6]+'-'+phone[7]+phone[8]+phone[9]+phone[10];
}

export function dataAtualFormatada(date: any){
  var data = new Date(date),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0'+mes : mes,
      anoF = data.getFullYear();
  return diaF+"/"+mesF+"/"+anoF;
}

export function formatCep(cep: string) {
  return cep[0] + cep[1] + cep[2] + cep[3] +cep[4] +'-'+ cep[5] + cep[6] + cep[7];
}

export function formatDateAndHour(hour: string, date: string) {
  return `${date+' '+hour}:00`;
}

export function formatDateForAgendamentos(date: string) {
  let b = new Date(date)

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return b.getDate() +' '+ monthNames[b.getMonth()].substring(0,3)+'.';
}

export function formateHourForAgendamentos(date: string) {
  let min = new Date(date).getMinutes();
  let hour = new Date(date).getHours();

  if(hour <= 9) {
    if(min === 0) {
      return `0${hour}:${min}0`;
    }
    return `0${hour}:${min}`
  } else if(min === 0) {
    return `${hour}:${min}0`;
  }
  return `${hour}:${min}`;
}