package com.validateCode;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.GetParameterRequest;
import software.amazon.awssdk.services.ssm.model.GetParameterResponse;
import com.validateCode.ApiGatewayResponse;

import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CodeValidatorHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    private final SsmClient ssmClient = SsmClient.create();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> event, Context context) {
        try {
        
            context.getLogger().log("EVENT: " + event);
        
            Object bodyObj = event.get("body");
            String rawBody;

            if (bodyObj == null) {
                throw new RuntimeException("Body is null");
            }

            if (bodyObj instanceof String) {
                rawBody = (String) bodyObj;
            } else {
                rawBody = objectMapper.writeValueAsString(bodyObj);
            }

// Se il body è la stringa "null", fermati
if (rawBody == null || rawBody.equals("null") || rawBody.isBlank()) {
    throw new RuntimeException("Body is empty or null");
}

Map<String, Object> input = objectMapper.readValue(rawBody, Map.class);
String userCode = (String) input.get("code");


            String expectedCode = getValidationCode();

            boolean isValid = expectedCode != null && expectedCode.equals(userCode);

            return new ApiGatewayResponse(
    		200,
    		Map.of(
        		"Content-Type", "application/json",
        		"Access-Control-Allow-Origin", "*",
        		"Access-Control-Allow-Headers", "*",
        		"Access-Control-Allow-Methods", "POST,OPTIONS"
    		),String.valueOf(isValid)
	    );

        } catch (Exception e) {
            context.getLogger().log("Error: " + e.getMessage());
            return new ApiGatewayResponse(
    		500,
    		Map.of(
        		"Content-Type", "application/json",
        		"Access-Control-Allow-Origin", "*",
        		"Access-Control-Allow-Headers", "*",
        		"Access-Control-Allow-Methods", "POST,OPTIONS"
    		),"{\"error\":\"Internal Server Error\"}"
	    );
        }
    }

    private String getValidationCode() {
        GetParameterRequest request = GetParameterRequest.builder()
            .name("/secure/code")
            .withDecryption(true)
            .build();

        GetParameterResponse response = ssmClient.getParameter(request);
        return response.parameter().value();
    }
}

