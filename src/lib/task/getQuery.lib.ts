import { GetTaskQueryType } from "@/types/services/task.types";

const queryList = [
	"projectId",
	"title",
	"dueDate",
	"order",
	"pageNumber",
	"pageSize",
] as const;

export const createQueryOptions = (
	urlQueryObject: URLSearchParams,
	queryOption: GetTaskQueryType
) => {
	console.log(urlQueryObject);
	console.log(queryOption);
	queryList.forEach((query) => {
		const value = urlQueryObject.get(query);
		if (value !== null) {
			switch (query) {
				case "pageNumber":
				case "pageSize":
					queryOption[query] = parseInt(value, 10);
					break;
				case "order":
					if (value === "asc" || value === "desc") {
						queryOption.order = value;
					}
					break;
				default:
					queryOption[query] = value;
					break;
			}
		}
	});
	return queryOption;
};
