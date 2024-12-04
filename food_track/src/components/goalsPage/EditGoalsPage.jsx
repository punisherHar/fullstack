import * as React from "react"
import {Link} from "react-router-dom";
import NavBar from "../navbar/Navbar"
import { useContext, useEffect } from 'react';
import TrackContext from '@/context/TrackContext';
import { TrackProvider } from "@/context/TrackContext";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function GoalsPage() {
  let {data} = useContext(TrackContext)
  return (
    <div className="w-full h-full">
        <NavBar/>
        <div className="flex h-[calc(100vh-64px)] justify-center items-center p-3">
            <Card className="bg-slate-200 w-full flex flex-col max-w-xl">
            <CardHeader>
                <CardTitle>Nutrient Goals</CardTitle>
                <CardDescription>Set Your Caloric and Nutritional Targets</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="calories">Calories(Kcal)</Label>
                    <Input id="calories" placeholder={data.calories_goal} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="protein">Protein(grams)</Label>
                    <Input id="protien" placeholder={data.protein_goal} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="fat">Fat(grams)</Label>
                    <Input id="fat" placeholder={data.fats_goal} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="carbs">Carbs(grams)</Label>
                    <Input id="carbs" placeholder={data.carbs_goal} />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
            <Link to="/"><Button className="w-40 h-10 bg-slate-700 hover:bg-slate-900">Done</Button></Link>
            </CardFooter>
            </Card>
        </div>
    </div>
  )
}
