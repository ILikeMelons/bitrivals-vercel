

export const getCode = async(id) => {
    const res = fetch("/api/getReferralCode",{
          body: JSON.stringify({
            id: id
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }).then(response => {
            return response;
        }).catch((e)=> {return e})
        console.log("allo");
        const result = await res;
        const jsonFormat = await result.json()
        return jsonFormat[0];
}