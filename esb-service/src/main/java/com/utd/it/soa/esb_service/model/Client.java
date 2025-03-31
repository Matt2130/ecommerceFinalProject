package com.utd.it.soa.esb_service.model;

public class Client {

    private String names;
    private String email;
    private String phone;
    private String lastName;
    private String birthday;
    private String address;

    // Constructor vacío
    public Client() {
    }

    // Constructor con todos los parámetros
    public Client(String names, String email, String phone, String lastName, String birthday, String address) {
        this.names = names;
        this.email = email;
        this.phone = phone;
        this.lastName = lastName;
        this.birthday = birthday;
        this.address = address;
    }

    // Getters y Setters
    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Método toString() para depuración
    @Override
    public String toString() {
        return "Client{" +
                "names='" + names + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthday='" + birthday + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}