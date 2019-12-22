#include <stdio.h>

void showArray();

int arr[10] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};


// Pega o tamanho do vetor
int const arrSize = sizeof(arr) / sizeof(arr[0]);

int main() {
    int
            passos = 0,
            trocando = 1;   // 1 para verdadeiro, 0 para falso


    for (int i = arrSize; i > 0 && trocando == 1; i--)
    {

        // Trocando fica falso

        trocando = 0;

        // Mostra o vetor

        showArray();

        // Segundo laço serve para rodar as comparações

        // O '-1' serve para evitar que ele compare o ultimo com um vetor não existente

        for (int j = 0; j < i - 1; j++)
        {

            // Adiciona um passo
            passos++;

            // Se o vetor atual for maior que o próximo
            if (arr[j] > arr[j + 1])
            {

                // Salva o atual em um temporario
                int temp = arr[j];

                // Colocar o atual com o valor do próximo
                arr[j] = arr[j + 1];

                // Coloca o vetor temporario (ex-atual) no proximo vetor
                arr[j + 1] = temp;

                // Coloca que ainda está trocando
                trocando = 1;

            }

                // Se não for maior, quebra o laço das comparações
            else break;

        }

    }

    printf("\n Passos: %d \n", passos);

}

void showArray()
{

    for (int i = 0; i < arrSize; i++)
        printf("%d \t", arr[i]);

    printf("\n");

}