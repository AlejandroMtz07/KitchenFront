import { Document, Page, Text, StyleSheet, Link, Image, View } from '@react-pdf/renderer'
import type { PublicRecipe } from '../types'

const styles = StyleSheet.create({
	title: {
		padding: '10px',
		height: '100px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#eeeeee',
		justifyContent: 'center'
	},
	logo: {
		width: '100px',
		height: '100px'
	},

	recipes_container: {

		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'

	},

	card: {

		width: '48%',
		border: '1 solid #d1d5db',
		borderRadius: 6,
		padding: 10,
		marginBottom: 15

	},

	container_image: {

		width: '100%',
		height: 120,
		objectFit: 'cover',
		marginBottom: 10

	},

	recipe_title: {

		fontSize: 14,
		textAlign: 'center'

	}
})

type PDFProps = {
	recipes: PublicRecipe[]
}

export default function PDF({ recipes }: PDFProps) {
	return (
		<Document>
			<Page size="A4">
				{/* Title of the recibe book */}
				<View style={styles.title}>
					<Image src={'../kitchen-logo.svg'} style={styles.logo} />
					<Text>
						Kitchen Recipes.
					</Text>
				</View>
				<View style={styles.recipes_container}>

					{/* Recipe card generate */}
					{recipes.map(recipe => (
						<View key={recipe.id}	style={styles.card}>
							<Image
								src={recipe.image}
								style={styles.container_image}
							/>
							<Text style={styles.recipe_title}>
								{recipe.name}
							</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	)
}
