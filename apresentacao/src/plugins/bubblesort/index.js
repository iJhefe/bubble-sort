 const defaultMethod = (arr, useTimeOut = false, time = 1500) => {

    let steps = 0

    for (let i = 0; i < arr.length; i++ )
    {

        for (let j = 0; j < i; j++)
        {

            steps++

            if (arr[j] > arr[j + 1])
            {
                if (useTimeOut)
                {
                    setTimeout(() => {
                        let temp = arr[j]

                        arr[j] = arr[j + 1]
                        arr[j + 1] = temp
                    }, time)
                }
                else
                {
                    let temp = arr[j]

                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }

        }

    }

     // eslint-disable-next-line no-console
    console.log(arr)
    return [arr, steps]

}

export default {
    defaultMethod
}