import { Document, Page, Text, StyleSheet, Link, Image } from '@react-pdf/renderer'
import type { PublicRecipe } from '../types'

const styles = StyleSheet.create({
	page: {
		
	}
})

type PDFProps = {
	recipes: PublicRecipe[]
}

export default function PDF({recipes}:PDFProps) {
	return (
		<Document>
			<Page size={'A4'}>
				{/* Recipe renderer */}
					{recipes.map(recipe =>(
						<Text key={recipe.id}>
							<Text>
								{recipe.name}
							</Text>
						</Text>
					))}
			</Page>
		</Document>
	)
}
