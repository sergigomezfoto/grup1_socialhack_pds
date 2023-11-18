This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Traning a text classification model on emotions

Hemos entrenado un modelo de clasificación de textos basado en el modelo del lenguaje para español RoBERTa entrenado.

El sistema de clasificación se puede testear en la siguiente web: https://huggingface.co/nicolauduran45/mood-you-classifier?text=O+sea%2C+estoy+fatal%2C+no+me+est%C3%A1+gustando+nada+esta+experiencia%2C+me+siento+s%C3%BAper+agobiada%2C+hay+mucha+competitividad+pero+en+el+mal+sentido%2C+hay+relaciones+s%C3%BAper+t%C3%B3xicas+entre+nosotros.+Estoy+muy+agobiada+y+contando+los+minutos+para+irme+porque+esto+est%C3%A1+siendo+lo+peor+que+he+hecho+en+mi+vida%2C+literalmente.+Quiero+matar+a+alguien.

Hemos usado el dataset de textos anotados por expertos con emociones Go-Emotions, con textos en ingles y los hemos traducido al español.


Referencias al LLM usado y al dataset usado:
`@inproceedings{demszky2020goemotions, author = {Demszky, Dorottya and Movshovitz-Attias, Dana and Ko, Jeongwoo and Cowen, Alan and Nemade, Gaurav and Ravi, Sujith}, booktitle = {58th Annual Meeting of the Association for Computational Linguistics (ACL)}, title = {{GoEmotions: A Dataset of Fine-Grained Emotions}}, year = {2020} }`

`@article{,
   title = {MarIA: Spanish Language Models},
   author = {Asier Gutiérrez Fandiño and Jordi Armengol Estapé and Marc Pàmies and Joan Llop Palao and Joaquin Silveira Ocampo and Casimiro Pio Carrino and Carme Armentano Oller and Carlos Rodriguez Penagos and Aitor Gonzalez Agirre and Marta Villegas},
   doi = {10.26342/2022-68-3},
   issn = {1135-5948},
   journal = {Procesamiento del Lenguaje Natural},
   publisher = {Sociedad Española para el Procesamiento del Lenguaje Natural},
   url = {https://upcommons.upc.edu/handle/2117/367156#.YyMTB4X9A-0.mendeley},
   volume = {68},
   year = {2022},
}`


