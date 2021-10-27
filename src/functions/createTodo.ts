import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient";
import { v4 as uuidv4 } from "uuid";

interface ITodo {
  id: string;
	user_id: string;
	title: string;
	done: boolean;
	deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event)  => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body);

  const todoId = uuidv4();

  const todo: ITodo = {
    id: todoId,
    user_id: userid,
    title,
    done: false,
    deadline: deadline
  }

  await document.put({
    TableName: "todos",
    Item: {
      ...todo
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo Created!"
    })
  }
}