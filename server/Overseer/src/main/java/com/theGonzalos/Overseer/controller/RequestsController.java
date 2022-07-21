package com.theGonzalos.Overseer.controller;

import com.theGonzalos.Overseer.model.Requests;
import com.theGonzalos.Overseer.service.RequestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/requests")
public class RequestsController {

    @Autowired
    private RequestsService requestsService;

    @GetMapping("/getAllRequests")
    public List<Requests> listRequests(){
        return requestsService.getAllRequests();
    }

    @PostMapping("/sendRequest")
    public String sendRequests(@RequestBody Requests request){
        requestsService.sendRequests(request);
        return "New request sent";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Requests> getRequest(@PathVariable Integer id){
        try {
            Requests request = requestsService.getRequest(id);
            return new ResponseEntity<Requests>(request, HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Requests>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Requests> updateRequest(@RequestBody Requests request, @PathVariable Integer id){
        try {
            Requests existingRequest = requestsService.getRequest(id);
            existingRequest.setFeedback(request.getFeedback());
            existingRequest.setReqCost(request.getReqCost());
            existingRequest.setReqDate(request.getReqDate());
            requestsService.sendRequests(existingRequest);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Requests>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Integer id){
        requestsService.deleteRequest(id);
        return "Deleted request with id "+ id;
    }

}
