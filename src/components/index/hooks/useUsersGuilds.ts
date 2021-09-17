import { useWeb3React } from "@web3-react/core"
import useSWR from "swr"

const fetchUsersGuilds = (_, address: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API}/user/getUserMemberships/${address}`).then(
    (response) => response.json().then((data) => data?.communities ?? [])
  )

const useUsersGuilds = () => {
  const { account } = useWeb3React()
  const { data } = useSWR(["usersGuilds", account], fetchUsersGuilds, {
    fallbackData: [],
    refreshInterval: 10000,
  })

  return data
}

export default useUsersGuilds
