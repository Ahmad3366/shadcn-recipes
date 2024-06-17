import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Recipe {
	id: string,
	title: string,
	image: string,
	time: number,
	description: string,
	vegan: boolean
}

async function getRecipes(): Promise<Recipe[]> {
	const res = await fetch('http://localhost:4000/recipes', {
		next: {
			revalidate: 0
		}
	});

	// delay response to see SkeletonCard comp
	await new Promise((resolve) => setTimeout(resolve, 3000))

	return res.json()
}

export default async function Home() {
	const recipes = await getRecipes()

  return (
    <main>
			<div className="grid grid-cols-3 gap-8">
				{recipes.map(recipe => (
					<Card key={recipe.id} className="flex flex-col justify-between">
						<CardHeader className="flex-row gap-4 items-center">
							<Avatar>
								<AvatarImage src={`img/${recipe.image}`} />
								<AvatarFallback>
									{recipe.title.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle>{recipe.title}</CardTitle>
								<CardDescription>{recipe.time} mins to cook.</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							{recipe.description}
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button>View Recipe</Button>
							{recipe.vegan && <Badge variant={'secondary'}>Vegan!</Badge>}
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
  );
}
