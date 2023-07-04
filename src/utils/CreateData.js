export const dataPieChart = (person) => {
  const female = person.filter((item) => item.gender === "Nu").length;
  const male = person.filter((item) => item.gender === "Nam").length;
  return {
    datasets: [
      {
        label: "Số lượng",
        data: [female, male],
        backgroundColor: ["#2a71d0", "#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
    labels: ["Nữ", "Nam"],
  };
};

export const dataBarChart = (person) => {
    const qt1 = person.filter( (item)=>{
        const age = calculateAge(item.birth);
        console.log("age nhe : " + age);
        return age >= 0 && age <= 20
    }).length
    const qt2 = person.filter( (item)=>{
        const age = calculateAge( item.birth)
        return age > 20 && age <= 40

    }).length
    const qt3 = person.filter( item=>{
        const age = calculateAge( item.birth)
        return age > 40 && age <= 60
    }).length
    const qt4 = person.filter( item =>{
        const age = calculateAge( item.birth)
        return age > 60
    }).length
  var data = [
    {
      id: 1,
      category: "0-20",
      quatity: qt1,
    },
    {
      id: 1,
      category: "21-40",
      quatity: qt2,
    },
    {
      id: 1,
      category: "41-60",
      quatity: qt3,
    },
    {
      id: 1,
      category: "60+",
      quatity: qt4,
    },
  ];
  return {
    datasets: [
      {
        label: "Số lượng",
        data: data.map((item) => item.quatity),
        backgroundColor: ["#2a71d0", "#50AF95", "#f4fc03", "#fc0303" ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
    labels: data.map((item)=> item.category)
  }
};




const calculateAge = (birth)=>{
    const today = new Date();
    const birthday = new Date(birth);
    console.log( today.getFullYear() - birthday.getFullYear() + 1);
    return today.getFullYear() - birthday.getFullYear() + 1;
}
