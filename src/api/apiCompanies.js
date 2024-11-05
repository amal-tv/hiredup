import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
    
 const supabase = await supabaseClient(token);

 const {data,error} = await supabase.from("companies").select("*")

 if(error){
    console.error("error fetching from the compnaies",error);
    return null;
 }

  return data;
}

export async function addNewCompanies(token,_,company_data) {
    
 const supabase = await supabaseClient(token);

 const random = Math.floor(Math.random() * 90000);
 const fileName = `logo-${random}-${company_data.name}`;
 const {error : storageError} = await supabase.storage.from("company-logo").upload(fileName,company_data.logo);

 
 

 if(storageError){
    console.error("error uplaoding the company log",storageError);
    return null;
 }
 const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;


 const {data,error} = await supabase.from("companies").insert([
    {
       name : company_data.name,
        logo_url,
    }
 ]).select();


 if(error){
    console.error("error submitting  the compnany",error);
    return null;
 }

  return data;
}


