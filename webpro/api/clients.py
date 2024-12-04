#Food search 
import requests
import os

def search_food(query):
    url = "https://api.edamam.com/api/food-database/v2/parser?"
    params = {
        "app_id": os.environ['APP_ID'],
        "app_key": os.environ['APP_KEY'],
        "ingr":query,
        "nutrition-type":'logging'
        
    }

    response = requests.get(url,params=params)
    if response.status_code == 200:
        data = response.json()
        limited_results = data["hints"][:7]


        for item in limited_results:
            print(item["food"]["label"]+"\n")
            for measure in item["measures"]:
                
                label = measure["label"]
                weight = measure["weight"]
                print(f"{label}:{weight}")
        data["hints"]=limited_results
        return(data)
    else:
        return{}



def get_detail(food_id):
    url = "https://api.edamam.com/api/nutrition-data"
    params = {
        "app_id": '3a6afe5b',
        "app_key": '8c989cf3a49d52db70eae706cb7bbf80',
        "nutrition-type":'logging',
        "ingr": food_id,
        
    }
    response = requests.get(url,params=params)


    if response.status_code == 200:
        data = response.json()
        return(data)
    else:
        return{}
    


