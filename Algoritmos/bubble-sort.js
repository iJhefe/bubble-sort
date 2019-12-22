const arr = [10, 9, 8, 7, 6, 1, 2, 3, 4, 5]

const size = arr.length

let passos = 0;

let trocando = true
for (let i = size; i > 0 && trocando; i--)
{

	trocando = false

	// Sempre até o penultimo para evitar comparações fora do vetor

	for (let j = 0; j < i - 1; j++)
	{
		passos++
		
		console.log(arr)

		if (arr[j] > arr[j + 1])
		{
			let temp = arr[j]

    		arr[j] = arr[j + 1]
    		arr[j + 1] = temp

    		trocando = true


    	// Tire o comentário abaixo para mostrar os passos
    	//console.log(`Passando: ${temp} para [${j + 1}] e ${arr[j]} para [${j}]`)
		
		}	

		// se não for maior, quebra o laço interno atual
		else break;
	}

}

console.log(`Concluido em ${passos} passos`)