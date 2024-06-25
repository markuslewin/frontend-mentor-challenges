import { sleep } from "#app/utils/sleep";
import { nbsp } from "#app/utils/unicode";
import { useQuery } from "@tanstack/react-query";
// import Ipbase from "@everapi/ipbase-js";
import { z } from "zod";

// const keySchema = z.string();
// const apiKey = keySchema.parse(import.meta.env["VITE_IPBASE_KEY"]);
// const ipBase = new Ipbase(apiKey);

const ipInfoResponseSchema = z.object({
  data: z.object({
    location: z.object({
      country: z.object({
        name: z.string(),
      }),
      city: z.object({
        name: z.string(),
      }),
    }),
  }),
});

function useIpInfo() {
  return useQuery({
    queryKey: ["ip-info"],
    async queryFn() {
      // const response = await ipBase.info();
      await sleep(3000);
      const response: unknown = {
        data: {
          location: {
            country: { name: "Sweden" },
            city: { name: "Stockholm" },
          },
        },
      };
      const ipInfo = ipInfoResponseSchema.parse(response).data;

      return ipInfo;
    },
    staleTime: Infinity,
  });
}

export function Location() {
  const ipInfo = useIpInfo();

  return (
    <span className="mt-4 block text-h3">
      {ipInfo.isSuccess ? (
        <>
          in {ipInfo.data.location.city.name},{" "}
          {ipInfo.data.location.country.name}
        </>
      ) : (
        nbsp
      )}
    </span>
  );
}
